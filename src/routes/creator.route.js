import { Router } from "express";
import { validation } from "../middleware/validator.middleware.js";
import authSchema from "../validation/auth.schema.js";
import authentication from "../middleware/authentication.middleware.js";
import authorization from "../middleware/authorization.middleware.js";
import { ValidationSource } from "../helpers/validator.js";
import {
  findByGenreSchema,
  podcastSchema,
  idParamsSchema,
  editPodcastSchema,
} from "../validation/podcast.schema.js";
import { getAllCreators } from "../controllers/podcast/podcast.controller.js";
import { validateFiles, upload } from "../middleware/multer.middleware.js";

const podcastRouter = new Router();

// get all podcast
podcastRouter.get("/", getAllCreators);

export default podcastRouter;
