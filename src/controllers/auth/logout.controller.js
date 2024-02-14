import { SuccessResponse } from "../../core/ApiResponse.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import prismaClient from "../../model/index.js";

const logoutController = asyncHandler(async (req, res, next) => {
  await prismaClient.key.delete({ where: { id: req.key.id } });
  new SuccessResponse("Logout successfull").send(res);
});

export default logoutController;
