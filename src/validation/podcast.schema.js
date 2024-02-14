import Joi from "joi";

export const genreSchema = Joi.object({
  genreName: Joi.string().required(),
  genreImage: Joi.string().required().uri(),
});

export const findByGenreSchema = Joi.object({
  slug: Joi.string().required(),
});

export const audioSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string(),
  mimetype: Joi.string()
    .valid("audio/mpeg", "audio/wav", "audio/mp3")
    .required(),
  destination: Joi.string().required(),
  filename: Joi.string().required(),
  path: Joi.string().required(),
  size: Joi.number().required(),
});

export const imageSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string(),
  mimetype: Joi.string()
    .valid("image/jpeg", "image/png", "image/gif")
    .required(),
  destination: Joi.string().required(),
  filename: Joi.string().required(),
  path: Joi.string().required(),
  size: Joi.number().required(),
});

export const podcastSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  thumbnail: imageSchema,
  audio: audioSchema,
  genreId: Joi.string().required(),
  language: Joi.string().required(),
  isPremium: Joi.boolean().default(false),
});

export const editPodcastSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  genreId: Joi.string().optional(),
  isPremium: Joi.boolean().optional(),
  audio: audioSchema.optional(),
  thumbnail: imageSchema.optional(),
});

export const idParamsSchema = Joi.object({
  id: Joi.string().required(),
});
