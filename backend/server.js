import express from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import authMiddleware from "./middleware/authMiddleware.js";
import limiter from "./middleware/rateLimiter.js";
import { config } from "./config/config.js";

const app = express();
const { PORT, NODE_ENV } = config;

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", authMiddleware, taskRoutes);
app.use(errorMiddleware); // Error handling middleware

connectDB(); // Connect to MongoDB

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Gracefully shut systems down
process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});
