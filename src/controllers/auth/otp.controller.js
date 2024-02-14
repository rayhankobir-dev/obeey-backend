import { SuccessResponse } from "../../core/ApiResponse.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import otpGenerator from "otp-generator";
import { sendEmail } from "../../services/email/email.config.js";
import { verificationTemplate } from "../../services/email/email.template.js";
import redisClient from "../../utils/redis.js";
import bcrypt from "bcrypt";
import { otpConfig } from "../../config.js";
import { BadRequestError } from "../../core/ApiError.js";

const otpController = {
  sendOtp: asyncHandler(async (req, res) => {
    const otp = generateOtp();
    const key = req.user.id + "otp";
    const hasedOtp = await bcrypt.hashSync(otp, 5);
    await redisClient.set(key, hasedOtp, "EX", otpConfig.otpValidity);
    await sendEmail(
      "rayhankobir793@gmail.com",
      "Your Verification Code - Obeey",
      verificationTemplate(otp, req.user.firstName)
    );
    new SuccessResponse("Verification code has been sent on your email").send(
      res
    );
  }),
  verifyOtp: asyncHandler(async (req, res) => {
    const key = req.user.id + "otp";
    const { otp } = req.body;
    const fetchedOtp = await redisClient.get(key);
    redisClient.del(key);

    const isVerified = await bcrypt.compareSync(otp, String(fetchedOtp));
    if (!isVerified) throw new BadRequestError("Invalid verification code");
    new SuccessResponse("Verification successful").send(res);
  }),
};

export const generateOtp = () => {
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
};

export default otpController;
