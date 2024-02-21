import { TokenRefreshResponse } from "../../core/ApiResponse.js";
import { createTokens, validateTokenData } from "../../helpers/authUtils.js";
import { AuthFailureError } from "../../core/ApiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import prismaClient from "../../model/index.js";
import * as JWT from "../../core/JWT.js";
import crypto from "crypto";

// token controller
const tokenController = asyncHandler(async (req, res) => {
  const refreshTokenPayload = await JWT.decode(req.body.refreshToken);
  validateTokenData(refreshTokenPayload);

  const user = await prismaClient.user.findFirst({
    where: { id: refreshTokenPayload.sub },
    include: {
      role: {
        select: { id: true, role: true },
      },
      key: true,
      settings: true,
    },
  });
  if (!user) throw new AuthFailureError("User not registered");
  req.user = user;

  // const key = await prismaClient.key.findUnique({
  //   where: {
  //     userId: refreshTokenPayload.sub,
  //     secondaryKey: refreshTokenPayload.prm,
  //   },
  // });

  // check token key are valid
  // if (!key) throw new AuthFailureError("Invalid access token!!");
  await prismaClient.key.delete({ where: { userId: refreshTokenPayload.sub } });

  // create new tokens key
  const acceessTokenKey = crypto.randomBytes(64).toString("hex");
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");

  // update token keys into database
  await prismaClient.key.create({
    data: {
      user: { connect: { id: refreshTokenPayload.sub } },
      primaryKey: acceessTokenKey,
      secondaryKey: refreshTokenKey,
    },
  });

  // create new tokens
  const tokens = await createTokens(req.user, acceessTokenKey, refreshTokenKey);

  new TokenRefreshResponse("Token issued", {
    user,
    ...tokens,
  }).send(res);
});
export default tokenController;
