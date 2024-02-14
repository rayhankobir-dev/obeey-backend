import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { cloudConfig } from "../config.js";
import { InternalError } from "../core/ApiError.js";

cloudinary.config(cloudConfig);

export const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new InternalError("Image is broken!");

    // upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    console.log("Coudinary------>", response.url);
    fs.unlinkSync(localFilePath);
    return response.url;
  } catch (error) {
    console.log("Failed to upload on cloudinary");
    return null;
  } finally {
    console.log("j");
  }
};
