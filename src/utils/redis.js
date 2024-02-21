import { Redis } from "ioredis";
import { redisConfig } from "../config.js";

const redisClient = new Redis("rediss://default:AVNS_Ud8-Yz18eqn4Hqw22PW@obeey-rayhankobir793-2757.a.aivencloud.com:16555");
export default redisClient;
