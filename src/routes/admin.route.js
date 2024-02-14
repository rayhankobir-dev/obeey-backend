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
} from "../controllers/profile/user.controller.js";
import { upload, validateFiles } from "../middleware/multer.middleware.js";

const profileRouter = new Router();

// transaction
profileRouter.get("/transaction", authentication, changePassController);
profileRouter.get("/stasctics", authentication, changePassController);
// podcast with more info
profileRouter.get("/podcast", authentication, changePassController);
profileRouter.get("/transaction", authentication, changePassController);

export default profileRouter;
