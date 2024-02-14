import { Redis } from "ioredis";
import { redisConfig } from "../config.js";

const redisClient = new Redis();
export default redisClient;
