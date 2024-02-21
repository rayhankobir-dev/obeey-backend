import { Router } from "express";
import { validation } from "../middleware/validator.middleware.js";
import authSchema from "../validation/auth.schema.js";
import authentication from "../middleware/authentication.middleware.js";
import { ValidationSource } from "../helpers/validator.js";
import { genreSchema } from "../validation/podcast.schema.js";
import {
  createGenreController,
  getGenreController,
} from "../controllers/podcast/genre.controller.js";

const genreRouter = new Router();

genreRouter.post(
  "/",
  validation(genreSchema, ValidationSource.BODY),
  createGenreController
);
genreRouter.get("/", getGenreController);

export default genreRouter;
