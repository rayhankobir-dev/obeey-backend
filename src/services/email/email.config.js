import nodemailer from "nodemailer";
import { mailConfig } from "../../config.js";
import { BadRequestError } from "../../core/ApiError.js";

// create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: mailConfig.service,
  auth: {
    user: mailConfig.senderMail,
    pass: mailConfig.gmailAppPassword,
  },
});

// sends email to users
export async function sendEmail(recipient, subject, body) {
  try {
    let mailOptions = {
      from: mailConfig.senderMail,
      to: recipient,
      subject: subject,
      html: body,
      replyTo: "noreply@obeey.com",
    };

    // send email
    let info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    throw new BadRequestError("Email is not valid your account is restrict");
  }
}
