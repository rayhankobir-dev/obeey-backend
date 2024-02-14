import { AuthFailureError } from "../core/ApiError.js";
import { JwtPayload, encode } from "../core/JWT.js";
import { tokenInfo } from "../config.js";

// access token from request header
export const getAccessToken = (authorization) => {
  if (!authorization)
    throw new AuthFailureError("Authorization header is required!");
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AuthFailureError("Invalid Authorization header format!");
  }

  return token;
};

// validate tokens
export const validateTokenData = (payload) => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience ||
    !payload.sub
  )
    throw new AuthFailureError("Invalid access token");
  return true;
};

// create tokens
export const createTokens = async (user, accessTokenKey, refreshTokenKey) => {
  const accessToken = await encode(
    Object.assign(
      {},
      new JwtPayload(
        tokenInfo.issuer,
        tokenInfo.audience,
        user.id.toString(),
        accessTokenKey,
        tokenInfo.accessTokenValidity
      )
    )
  );

  if (!accessToken) throw new InternalError();

  const refreshToken = await encode(
    Object.assign(
      {},
      new JwtPayload(
        tokenInfo.issuer,
        tokenInfo.audience,
        user.id.toString(),
        refreshTokenKey,
        tokenInfo.refreshTokenValidity
      )
    )
  );

  if (!refreshToken) throw new InternalError();

  return {
    accessToken,
    refreshToken,
  };
};
