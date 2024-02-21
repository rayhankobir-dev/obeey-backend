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
  findByAuthorSchema,
} from "../validation/podcast.schema.js";
import {
  postPodcast,
  getAllPodcasts,
  editPodcastController,
  deletePodcastController,
  getPodcastsByGenre,
  getPodcastsByAuthor,
  getMadeForYou,
} from "../controllers/podcast/podcast.controller.js";
import { validateFiles, upload } from "../middleware/multer.middleware.js";

const podcastRouter = new Router();

// get all podcast
podcastRouter.get("/", getAllPodcasts);

// create new podcast
podcastRouter.post(
  "/",
  upload({
    thumbnail: [".jpg", ".png", ".jpeg", ".webp"],
    audio: [".mp3", ".mpeg", ".wav"],
  }).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  validateFiles,
  validation(podcastSchema),
  authentication,
  authorization(["CREATOR"]),
  postPodcast
);

// edit podcast
podcastRouter.put(
  "/:id",
  upload({ thumbnail: [".jpg", ".png", ".jpeg"], audio: [".mp3"] }).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  validateFiles,
  validation(idParamsSchema, ValidationSource.PARAM),
  validation(editPodcastSchema),
  authentication,
  authorization(["CREATOR"]),
  editPodcastController
);

//
podcastRouter.delete(
  "/:id",
  validation(idParamsSchema, ValidationSource.PARAM),
  authentication,
  authorization(["CREATOR", "ADMIN"]),
  deletePodcastController
);

// get podcast by genre
podcastRouter.get(
  "/:slug",
  validation(findByGenreSchema, ValidationSource.PARAM),
  getPodcastsByGenre
);

// get podcast by genre
podcastRouter.get(
  "/author/:author",
  validation(findByAuthorSchema, ValidationSource.PARAM),
  getPodcastsByAuthor
);

// get podcast by genre
podcastRouter.get("/user/made-for-you", authentication, getMadeForYou);

export default podcastRouter;
