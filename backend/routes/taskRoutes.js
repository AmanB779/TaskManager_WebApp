import express from "express";
import { addTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/addTask", addTask); // Add new task route
router.get("/", getTasks); // Get all tasks route
router.put("/:taskId", updateTask); // Update task route
router.delete("/:taskId", deleteTask); // Delete task route

export default router;
