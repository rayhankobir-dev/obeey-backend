import express, { response } from "express";
import authRouter from "./auth.route.js";
import genreRouter from "./genre.route.js";
import podcastRouter from "./podcast.route.js";
const router = new express.Router();

// routes
router.use("/auth", authRouter);
router.use("/genre", genreRouter);
router.use("/podcast", podcastRouter);
export default router;
