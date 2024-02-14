import prismaClient from "../model/index.js";
import { InternalError, NotFoundError } from "../core/ApiError.js";

export const editEmailSetting = async (id) => {
  try {
    const updatedUser = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        settings: {
          update: {
            promotion_email,
            security_email,
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
