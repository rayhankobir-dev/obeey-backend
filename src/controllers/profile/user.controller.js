import { InternalError } from "../../core/ApiError.js";
import { SuccessResponse } from "../../core/ApiResponse.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { exclude } from "../../helpers/utils.js";
import prismaClient from "../../model/index.js";
import {
  editEmailSetting,
  editPersonalInfo,
  updateAvatar,
  updateCover,
  updatePassword,
} from "../../services/user.service.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await exclude(
    await prismaClient.user.findUnique({
      where: { id: req.user.id },
      include: {
        role: {
          select: { id: true, role: true },
        },
        genre: true,
        settings: true,
        subscriptionPlan: true,
      },
    }),
    ["password", "roleId"]
  );

  new SuccessResponse("Success", user).send(res);
});

export const changePassController = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await updatePassword(req.user.id, currentPassword, newPassword);
  new SuccessResponse("Password successfully updated").send(res);
});

export const updateSettingController = asyncHandler(async (req, res) => {
  const user = await editEmailSetting(req.user.id, req.body);
  new SuccessResponse("Email settings are updated", user).send(res);
});

export const updatePersonalInfo = asyncHandler(async (req, res) => {
  const { firstName, lastName, gender, genreId, country, language } = req.body;

  const updateFields = {};
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;
  if (gender) updateFields.gender = gender;
  if (genreId) updateFields.genreId = genreId;
  if (country) updateFields.country = country;
  if (language) updateFields.language = language;

  const updatedUser = await exclude(
    await editPersonalInfo(req.user.id, updateFields),
    ["password"]
  );
  new SuccessResponse("Information are successfully updated", {
    user: updatedUser,
  }).send(res);
});

export const editAvatar = asyncHandler(async (req, res) => {
  const { avatar } = req.body;
  const imageLink = await uploadToCloudinary(avatar?.path);
  const user = await exclude(await updateAvatar(req.user.id, imageLink), [
    "password",
  ]);
  new SuccessResponse("Your avtar is successfully changed", {
    user,
  }).send(res);
});

export const editCover = asyncHandler(async (req, res) => {
  const { coverImage } = req.body;
  const imageLink = await uploadToCloudinary(coverImage?.path);
  const user = await exclude(await updateCover(req.user.id, imageLink), [
    "password",
  ]);
  new SuccessResponse("Your cover image is successfully changed", {
    user,
  }).send(res);
});
