import express, { response } from "express";
import authRouter from "./auth.route.js";
import genreRouter from "./genre.route.js";
import podcastRouter from "./podcast.route.js";
import profileRouter from "./profile.route.js";
const router = new express.Router();

// routes
router.use("/auth", authRouter);
router.use("/genre", genreRouter);
router.use("/podcast", podcastRouter);
router.use("/profile", profileRouter);
router.use("/admin", profileRouter);
export default router;
