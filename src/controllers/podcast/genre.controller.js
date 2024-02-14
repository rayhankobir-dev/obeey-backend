import { SuccessMsgResponse, SuccessResponse } from "../../core/ApiResponse.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { slugify } from "../../helpers/utils.js";
import { createGenre, getGenres } from "../../services/genre.service.js";

export const createGenreController = asyncHandler(async (req, res) => {
  const { genreName, genreImage } = req.body;
  const slug = slugify(genreName);
  const createdGenre = await createGenre({ genreName, genreImage, slug });
  new SuccessResponse(
    "Genre successfully created",
    {
      genre: createdGenre,
    },
    201
  ).send(res);
});

export const getGenreController = asyncHandler(async (req, res) => {
  const genres = await getGenres();
  new SuccessResponse("Success", { genres }).send(res);
});

export const editGenreController = asyncHandler(async (req, res) => {
  const genres = await getGenres();
  new SuccessMsgResponse().data(genres).send(res);
});
