import dotenv from "dotenv";
dotenv.config();

// application mode, port and default timezone
export const environment = process.env.MODE_ENV;
export const port = process.env.PORT || 3000;
export const timezone = process.env.TIME_ZONE;

// databe configurations variables
export const db = {
  name: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_USER_PASSWORD || "",
  dbUrl: process.env.DATABASE_URL || "",
};

// cors policy configuration
export const corsUrl = process.env.CORS_URL;

// token accesibility variables
export const tokenInfo = {
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || "0"),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || "0"),
  issuer: process.env.TOKEN_ISSUER || "",
  audience: process.env.TOKEN_AUDIENCE || "",
};

// logging file directory
const logDirectory = process.env.LOG_DIRECTORY;

// redis configuration variables
export const redisConfig = {
    url: process.env.REDIS_URL || {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    user: process.env.REDIS_USER || "default",
    password: process.env.REDIS_PASSWORD,
  },
};

// couldinary configuration variables
export const cloudConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

// cache duration configuration
export const caching = {
  contentCacheDuration: parseInt(
    process.env.CONTENT_CACHE_DURATION_MILLIS || "600000"
  ),
};

export const mailConfig = {
  service: process.env.MAIL_SERVICE || "gmail",
  senderMail: process.env.SENDER_MAIL || "rajurayhan.hd@gmail.com",
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD || "gmail",
  mailPort: process.env.MAIL_PORT || "gmail",
};

export const otpConfig = {
  otpValidity: process.env.OTP_VALIDITY || 600,
};
