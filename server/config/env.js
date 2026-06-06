import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
}