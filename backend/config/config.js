import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "my_secret_jwt_key",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
};
