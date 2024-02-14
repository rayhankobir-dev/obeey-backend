import crypto from "crypto";
import bcrypt from "bcrypt";
import prismaClient from "../../model/index.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { BadRequestError, AuthFailureError } from "../../core/ApiError.js";
import { exclude } from "../../helpers/utils.js";
import { createTokens } from "../../helpers/authUtils.js";
import { SuccessResponse } from "../../core/ApiResponse.js";

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await prismaClient.user.findUnique({
    where: { email },
    include: {
      role: {
        select: { id: true, role: true },
      },
      key: true,
      settings: true,
    },
  });

  if (!user) throw new BadRequestError("Invalid credentials");
  if (!user.password)
    throw new BadRequestError("Password not set forget your password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new AuthFailureError("Incorrect email or password");
  const accessTokenKey = crypto.randomBytes(64).toString("hex");
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");

  if (user.key) {
    await prismaClient.key.delete({ where: { id: user.key.id } });
  }

  await prismaClient.key.create({
    data: {
      userId: user.id,
      primaryKey: accessTokenKey,
      secondaryKey: refreshTokenKey,
    },
  });

  const userData = await exclude(user, ["password", "roleId", "key"]);
  const tokens = await createTokens(userData, accessTokenKey, refreshTokenKey);

  new SuccessResponse("Login successfull", {
    user: userData,
    tokens,
  }).send(res);
});
