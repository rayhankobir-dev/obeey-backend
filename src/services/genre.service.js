import { InternalError } from "../core/ApiError.js";
import { slugify } from "../helpers/utils.js";
import prismaClient from "../model/index.js";

// Create a new genre
export const createGenre = async (genre) => {
  try {
    const createdGenre = await prismaClient.genre.create({
      data: {
        ...genre,
      },
    });
    return createdGenre;
  } catch (error) {
    console.log(error);
    throw new InternalError();
  }
};

// Get all genres
export const getGenres = async () => {
  try {
    const genres = await prismaClient.genre.findMany({});
    return genres;
  } catch (error) {
    throw new InternalError();
  }
};

// Delete a genre
export const deleteGenre = async (id) => {
  try {
    await prismaClient.genre.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting genre:", error);
  }
};

// Edit a genre
export const editGenre = async (id, genreName) => {
  try {
    const updatedGenre = await prismaClient.genre.update({
      where: { id },
      data: {
        genreName,
      },
    });
  } catch (error) {
    console.error("Error updating genre:", error);
  }
};
