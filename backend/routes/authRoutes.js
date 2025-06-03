import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // Registration route
router.post("/login", login); // Login route

export default router;
