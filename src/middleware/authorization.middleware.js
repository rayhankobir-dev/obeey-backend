import asyncHandler from "../helpers/asyncHandler.js";
import { AuthFailureError } from "../core/ApiError.js";
import prismaClient from "../model/index.js";

const authorization = (allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user.role)
      throw new AuthFailureError("Unauthenticated user");
    if (!allowedRoles.some((role) => req.user.role.role == role))
      throw new AuthFailureError("You are not authorized");

    const roles = await prismaClient.role.findMany();
    if (!roles.some((role) => req.user.role.id == role.id))
      throw new AuthFailureError("Permission denied");
    next();
  });

export default authorization;
