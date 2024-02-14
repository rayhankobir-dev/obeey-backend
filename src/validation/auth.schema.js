import Joi from "joi";
import { JoiAuthBearer } from "../helpers/validator.js";

const authSchema = {
  login: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),

  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),

  signup: Joi.object().keys({
    firstName: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    role: Joi.string().default("USER").valid("USER", "ADMIN", "CREATOR"),
  }),

  otp: Joi.object().keys({
    otp: Joi.string()
      .length(4)
      .pattern(/^\d+$/)
      .message("OTP must be a 4-digit number"),
  }),
};

export default authSchema;
