import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const { JWT_SECRET_KEY, JWT_EXPIRATION } = config;

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATION });
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

export { generateToken, verifyToken };
