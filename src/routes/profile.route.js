import { Router } from "express";
import { validation } from "../middleware/validator.middleware.js";
import authSchema from "../validation/auth.schema.js";
import { loginController } from "../controllers/auth/login.controller.js";
import signUpController from "../controllers/auth/signup.controller.js";
import logoutController from "../controllers/auth/logout.controller.js";
import authentication from "../middleware/authentication.middleware.js";
import { ValidationSource } from "../helpers/validator.js";
import tokenController from "../controllers/auth/token.controller.js";
import otpController from "../controllers/auth/otp.controller.js";

const authRouter = new Router();

// profile routes
authRouter.post(
  "/change-password",
  validation(authSchema.otp),
  authentication,
  otpController.verifyOtp
);
authRouter.post(
  "/refresh-token",
  validation(authSchema.refreshToken, ValidationSource.BODY),
  tokenController
);
authRouter.delete(
  "/logout",
  validation(authSchema.auth, ValidationSource.HEADER),
  authentication,
  logoutController
);

export default authRouter;
