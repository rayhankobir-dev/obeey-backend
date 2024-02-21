import prismaClient from "../model/index.js";
import { InternalError, NotFoundError } from "../core/ApiError.js";
import bcrypt from "bcrypt";

export const editEmailSetting = async (id, setting) => {
  try {
    const updatedUser = await prismaClient.emailSeeting.update({
      where: {
        userId: id,
      },
      data: {
        ...setting,
      },
      include: {
        user: {
          include: {
            role: {
              select: { id: true, role: true },
            },
            genre: true,
            settings: true,
            subscriptionPlan: true,
          },
        },
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new InternalError("Could not update email settings");
  }
};

export const updatePassword = async (id, currentPassword, newPassword) => {
  try {
    const user = await findUserById(id);
    const isMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isMatched) throw new InternalError("Current password is incorrect");
    const hashPassword = await bcrypt.hash(newPassword, 10);
    // update password
    await prismaClient.user.update({
      where: { id },
      data: {
        password: hashPassword,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const editPersonalInfo = async (id, userData) => {
  try {
    return await prismaClient.user.update({
      where: { id },
      data: {
        ...userData,
      },
      include: {
        role: {
          select: { id: true, role: true },
        },
        genre: true,
        settings: true,
        subscriptionPlan: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCover = async (id, coverImage) => {
  try {
    return await prismaClient.user.update({
      where: { id },
      data: {
        coverImage,
      },
      include: {
        role: {
          select: { id: true, role: true },
        },
        genre: true,
        settings: true,
        subscriptionPlan: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateAvatar = async (id, avatar) => {
  try {
    return await prismaClient.user.update({
      where: { id },
      data: {
        avatar,
      },
      include: {
        role: {
          select: { id: true, role: true },
        },
        genre: true,
        settings: true,
        subscriptionPlan: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findUserById = async (id) => {
  try {
    const user = await prismaClient.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    throw new NotFoundError("User not found");
  }
};
