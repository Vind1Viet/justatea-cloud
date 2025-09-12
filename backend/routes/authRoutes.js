import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

// Register
router.post("/register", AuthController.register);

// Login
router.post("/login", AuthController.login);

export default router;
