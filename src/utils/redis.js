import { Redis } from "ioredis";
import { redisConfig } from "../config.js";

const redisClient = new Redis(redisConfig.url);
export default redisClient;
