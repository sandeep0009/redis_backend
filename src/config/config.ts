import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

export const PORT=process.env.PORT;
export const JWT_SECRET=process.env.JWT_SECRET;
export const redisClient=Redis.createClient();
export const DB_URI=process.env.DB_URI;