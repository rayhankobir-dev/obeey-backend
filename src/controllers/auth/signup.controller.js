import crypto from "crypto";
import bcrypt from "bcrypt";
import prismaClient from "../../model/index.js";
import { Prisma } from "@prisma/client";
import asyncHandler from "../../helpers/asyncHandler.js";
import { exclude } from "../../helpers/utils.js";
import { createTokens } from "../../helpers/authUtils.js";
import {
  ApiError,
  BadRequestError,
  InternalError,
} from "../../core/ApiError.js";
import { SuccessResponse } from "../../core/ApiResponse.js";

// signup controller
const signUpController = asyncHandler(async (req, res, next) => {
  const userData = await signupUser(req.body);
  new SuccessResponse("Signup successfull", userData, 201).send(res);
});

// signup service
const signupUser = async ({ firstName, lastName, email, password, role }) => {
  try {
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (user) throw new BadRequestError("Email already in use!");

    const fetchRole = await prismaClient.role.findFirst({
      where: { role: role },
    });
    if (!fetchRole) throw new BadRequestError("User role is not authenticated");

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");
    const hashPassword = await bcrypt.hash(password, 10);

    const createdUser = await prismaClient.user.create({
      data: {
        firstName,
        email,
        password: hashPassword,
        roleId: fetchRole.id,
        key: {
          create: {
            primaryKey: accessTokenKey,
            secondaryKey: refreshTokenKey,
            status: true,
          },
        },
        settings: {
          create: {
            promotionalEmail: true,
            securityEmail: true,
          },
        },
      },
      include: {
        role: {
          select: { id: true, role: true },
        },
      },
    });

    // excluding password and roleId
    const userData = await exclude(createdUser, ["password", "roleId"]);
    // create tokens
    const tokens = await createTokens(
      userData,
      accessTokenKey,
      refreshTokenKey
    );

    return { user: userData, tokens };
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw new InternalError("Internal server error");
  }
};

export default signUpController;
