import { Router } from "express";
import { validation } from "../middleware/validator.middleware.js";
import authentication from "../middleware/authentication.middleware.js";
import {
  changePassSchema,
  emailSettingSchema,
  personalInfoSchema,
  profileImageSchema,
} from "../validation/profile.schema.js";
import {
  changePassController,
  editAvatar,
  editCover,
  updatePersonalInfo,
  updateSettingController,
  getUserProfile,
} from "../controllers/profile/user.controller.js";
import { upload, validateFiles } from "../middleware/multer.middleware.js";

const profileRouter = new Router();

// profile routes
profileRouter.get("/", authentication, getUserProfile);
profileRouter.put(
  "/change-password",
  validation(changePassSchema),
  authentication,
  changePassController
);
profileRouter.put(
  "/email-setting",
  validation(emailSettingSchema),
  authentication,
  updateSettingController
);
profileRouter.put(
  "/update",
  validation(personalInfoSchema),
  authentication,
  updatePersonalInfo
);

profileRouter.put(
  "/update-avatar",
  upload({ avatar: [".jpg", ".png", ".jpeg"] }).fields([
    { name: "avatar", maxCount: 1 },
  ]),
  validateFiles,
  validation(profileImageSchema.avatar),
  authentication,
  editAvatar
);

profileRouter.put(
  "/update-cover",
  upload({ coverImage: [".jpg", ".png", ".jpeg"] }).fields([
    { name: "coverImage", maxCount: 1 },
  ]),
  validateFiles,
  validation(profileImageSchema.cover),
  authentication,
  editCover
);

export default profileRouter;
