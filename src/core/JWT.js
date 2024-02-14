import path from "path";
import { promises as fsPromises } from "fs";
import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;

import { BadTokenError, TokenExpiredError } from "./ApiError.js";

// token payload
export class JwtPayload {
  constructor(issuer, audience, subject, param, validity) {
    this.iss = issuer;
    this.aud = audience;
    this.sub = subject;
    this.iat = Math.floor(Date.now() / 1000);
    this.exp = this.iat + validity;
    this.prm = param;
  }
}

// read public key from the key directory
export const readPublicKey = async () => {
  const filePath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "../../keys/public.pem"
  );
  try {
    const data = await fsPromises.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    throw err;
  }
};

// read private key from the key directory
export const readPrivateKey = async () => {
  const filePath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "../../keys/private.pem"
  );
  try {
    const data = await fsPromises.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    throw err;
  }
};
// encode tokens
export const encode = async (payload) => {
  const cert = await readPrivateKey();
  if (!cert) {
    throw new ApiError("Token generation failure");
  }
  return new Promise((resolve, reject) => {
    sign(payload, cert, { algorithm: "RS256" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

// validate tokens
export const validate = async (token) => {
  const cert = await readPublicKey();
  try {
    return await verify(token, cert);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new TokenExpiredError();
    } else {
      throw new BadTokenError();
    }
  }
};

// decode tokens
export const decode = async (token) => {
  const cert = await readPublicKey();
  try {
    return await verify(token, cert, { ignoreExpiration: true });
  } catch (err) {
    throw new BadTokenError();
  }
};
