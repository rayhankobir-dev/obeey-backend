import Joi from "joi";

export const changePassSchema = Joi.object().keys({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const emailSettingSchema = Joi.object().keys({
  promotionEmail: Joi.string().optional(),
  securityEmail: Joi.string().optional(),
});

export const personalInfoSchema = Joi.object().keys({});
