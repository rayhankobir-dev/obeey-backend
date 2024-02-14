import { fakeRole } from "../../../prisma/fake-data.js";
import { SuccessResponse } from "../../core/ApiResponse.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import {
  createPodcast,
  deletePodcast,
  getPodcast,
  podcastsByAuthor,
  podcastsByGenre,
  updatePodcast,
} from "../../services/podcast.service.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";

export const postPodcast = asyncHandler(async (req, res) => {
  const { thumbnail, audio } = req.body;
  req.body.audio = await uploadToCloudinary(audio.path);
  req.body.thumbnail = await uploadToCloudinary(thumbnail.path);
  const podcast = await createPodcast(req.user.id, req.body);
  new SuccessResponse(
    "Podcast successfully created",
    {
      podcast,
    },
    201
  ).send(res);
});

export const editPodcastController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, genreId, isPremium, thumbnail, audio } = req.body;

  const updateFields = {};
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (genreId) updateFields.genreId = genreId;
  if (isPremium !== undefined) updateFields.isPremium = isPremium;
  if (thumbnail?.path)
    updateFields.thumbnail = await uploadToCloudinary(thumbnail.path);
  if (audio?.path) updateFields.audio = await uploadToCloudinary(audio.path);

  const updatedPodcast = await updatePodcast(id, updateFields);
  console.log(updatePodcast);
  new SuccessResponse("Podcast successfully updated", {
    podcast: updatedPodcast,
  }).send(res);
});

export const deletePodcastController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedPodcast = await deletePodcast(id);
  new SuccessResponse("Podcast successfully deleted", {
    podcast: deletedPodcast,
  }).send(res);
});

export const getAllPodcasts = asyncHandler(async (req, res) => {
  const podcasts = await getPodcast();
  new SuccessResponse("Success", {
    podcasts,
  }).send(res);
});

export const getPodcastsByGenre = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const podcasts = await podcastsByGenre(slug);
  new SuccessResponse("Success", {
    podcasts,
  }).send(res);
});

export const getPodcastsByAuthor = asyncHandler(async (req, res) => {
  const { author } = req.params;
  const podcasts = await podcastsByAuthor(author);
  new SuccessResponse("Success", {
    podcasts,
  }).send(res);
});
