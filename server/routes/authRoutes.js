// routes/authRoutes.js

import express from "express";
import {
  registerUser,
  loginUser,
  verifyOtp,
  googleAuth,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (User, Admin, etc.)
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login with email/password
// @access  Public
router.post("/login", loginUser);

// @route   POST /api/auth/verify-otp
// @desc    OTP verification during registration
// @access  Public
router.post("/verify-otp", verifyOtp);

// @route   POST /api/auth/google
// @desc    Google OAuth login (Optional feature)
// @access  Public
router.post("/google", googleAuth);

// Optionally protected route to test login
router.get("/me", protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
