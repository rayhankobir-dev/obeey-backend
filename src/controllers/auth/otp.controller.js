import { SuccessResponse } from "../../core/ApiResponse.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import otpGenerator from "otp-generator";
import { sendEmail } from "../../services/email/email.config.js";
import { verificationTemplate } from "../../services/email/email.template.js";
import redisClient from "../../utils/redis.js";
import bcrypt from "bcrypt";
import { otpConfig } from "../../config.js";
import { BadRequestError } from "../../core/ApiError.js";
import prismaClient from "../../model/index.js";
import { exclude } from "../../helpers/utils.js";

const otpController = {
  sendOtp: asyncHandler(async (req, res) => {
    const otp = generateOtp();
    const key = req.user.id + "otp";
    console.log("Key:", key);
    console.log("otp", otp);

    const hasedOtp = await bcrypt.hashSync(otp, 5);
    console.log("hasedOtp", hasedOtp);
    await redisClient.set(key, hasedOtp, "EX", otpConfig.otpValidity);
    sendEmail(
      req.user.email,
      "Your Verification Code - Obeey",
      verificationTemplate(otp, req.user.firstName)
    );
    new SuccessResponse("Verification email has been sent.").send(res);
  }),

  verifyOtp: asyncHandler(async (req, res) => {
    const { id } = req.user;
    const key = id + "otp";
    console.log("Key:", key);
    const { otp } = req.body;
    console.log("otp", otp);
    const fetchedOtp = await redisClient.get(key);
    console.log("fetchedOtp", fetchedOtp);
    redisClient.del(key);

    const isVerified = await bcrypt.compareSync(otp, String(fetchedOtp));
    console.log(isVerified);
    const user = prismaClient.user.update({
      where: {
        id,
      },
      data: {
        emailVerified: true,
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
    if (!isVerified) throw new BadRequestError("Invalid verification code");
    new SuccessResponse(
      "Verification successful",
      await exclude(user, ["password"])
    ).send(res);
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
