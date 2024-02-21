import prismaClient from "../model/index.js";
import {
  AuthFailureError,
  InternalError,
  NotFoundError,
} from "../core/ApiError.js";

// Create a new podcast
export const createPodcast = async (authorId, data) => {
  try {
    const podcast = await prismaClient.podcast.create({
      data: {
        authorId,
        ...data,
      },
    });
    return podcast;
  } catch (error) {
    throw new InternalError(error.message);
  }
};

// Get all podcasts
export const getPodcast = async (req, res) => {
  try {
    const podcasts = await prismaClient.podcast.findMany({
      include: {
        genre: { select: { genreName: true } },
        author: { select: { firstName: true, lastName: true } },
      },
    });
    return podcasts;
  } catch (error) {
    throw new InternalError(error.message);
  }
};

// Delete a podcast
export const deletePodcast = async (id) => {
  try {
    const podcast = await getPodcastById(id);
    if (podcast == null) throw new NotFoundError("Podcast not found");
    return await prismaClient.podcast.delete({ where: { id } });
  } catch (error) {
    throw error;
  }
};

export const getPodcastById = async (id) => {
  try {
    const podcast = await prismaClient.podcast.findUnique({ where: { id } });
    return podcast;
  } catch (error) {
    console.error("Error deleting podcast:", error);
  }
};

export const updatePodcast = async (id, data) => {
  try {
    const updatedPodcast = await prismaClient.podcast.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return updatedPodcast;
  } catch (error) {
    console.error("Error updating podcast:", error);
  }
};

// Get podcasts by author
export const podcastsByAuthor = async (authorId) => {
  try {
    const podcasts = await prismaClient.podcast.findMany({
      where: { authorId },
    });
    return podcasts;
  } catch (error) {
    throw error;
  }
};

// Get podcasts by genre
export const podcastsByGenre = async (slug) => {
  try {
    const podcasts = await prismaClient.podcast.findMany({
      where: {
        genre: {
          slug,
        },
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return podcasts;
  } catch (error) {
    console.error("Error getting podcasts by genre:", error);
  }
};

// Get podcasts by genre
export const madeForYou = async (id) => {
  console.log(id);
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AuthFailureError(`User with id ${userId} not found`);
    }

    const podcasts = await prismaClient.podcast.findMany({
      where: {
        OR: [{ language: user.language }],
      },
      orderBy: {
        title: "desc",
      },
      take: 8,
    });

    return podcasts;
  } catch (error) {
    console.error("Error getting podcasts by genre:", error);
  }
};
