import {
  AuthFailureError,
  TokenExpiredError,
  AccessTokenError,
} from "../core/ApiError.js";
import { getAccessToken, validateTokenData } from "../helpers/authUtils.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { exclude } from "../helpers/utils.js";
import prismaClient from "../model/index.js";
import * as JWT from "../core/JWT.js";

// authenction middleware
const authentication = asyncHandler(async (req, res, next) => {
  req.accessToken = getAccessToken(req.headers.authorization);

  try {
    const payload = await JWT.validate(req.accessToken);
    validateTokenData(payload);

    const user = await prismaClient.user.findUnique({
      where: { id: payload.sub },
      include: {
        role: {
          select: { id: true, role: true },
        },
      },
    });

    if (!user) throw new AuthFailureError("User not registered");
    req.user = await exclude(user, ["roleId", "password"]);

    const key = await prismaClient.key.findUnique({
      where: { userId: user.id, primaryKey: payload.prm },
    });

    if (!key) throw new AuthFailureError("Invalid access token");
    req.key = key;

    return next();
  } catch (err) {
    throw err;
  }
});

export default authentication;
