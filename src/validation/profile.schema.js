import Joi from "joi";
import { imageSchema } from "./podcast.schema.js";

export const changePassSchema = Joi.object().keys({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const emailSettingSchema = Joi.object().keys({
  promotionalEmail: Joi.boolean().required(),
  securityEmail: Joi.boolean().optional(),
});

export const personalInfoSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(null).optional(),
  genreId: Joi.string().optional(),
  gender: Joi.string().optional(),
  country: Joi.string().allow(null).optional(),
  language: Joi.string().allow(null).optional(),
});

export const profileImageSchema = {
  avatar: Joi.object().keys({ avatar: imageSchema.required() }),
  cover: Joi.object().keys({ coverImage: imageSchema.required() }),
};
