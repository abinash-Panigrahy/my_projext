// controllers/authController.js
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js"; // Correct import
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../services/emailService.js"; // Import specific function

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body; // Added phone based on User model
    if (!name || !email || !password || !phone || !role) { // All fields are required
      return res.status(400).json({ message: "All fields (name, email, password, phone, role) are required." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ message: "User with this phone number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a simple OTP (for demo purposes)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    const user = await User.create({
      name,
      email,
      phone, // Include phone
      password: hashedPassword,
      role,
      otp: {
        code: otpCode,
        expiresAt: otpExpiresAt,
      },
      isVerified: false,
    });

    // Send OTP email
    await sendOtpEmail(user.email, otpCode);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      message: "User registered. OTP sent to email for verification.",
      // token: generateToken(user._id), // Don't send token until verified
    });
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials (email not found)." });
    }
    if (!user.isVerified) {
      // Re-send OTP if account is not verified
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
      user.otp = { code: otpCode, expiresAt: otpExpiresAt };
      await user.save();
      await sendOtpEmail(user.email, otpCode);
      return res.status(403).json({ message: "Account not verified. New OTP sent to your email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials (password mismatch)." });
    }

    const token = generateToken(user._id);

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'Lax', // Adjust as needed for your frontend setup
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token, // Optionally send token in response body too (less secure)
    });
  } catch (error) {
    console.error("Login User Error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.otp || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    user.isVerified = true;
    user.otp = undefined; // Clear OTP after successful verification
    await user.save();

    const token = generateToken(user._id); // Generate token after verification

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: 'Lax',
    });

    return res.json({
      message: "OTP verified. Account activated.",
      verified: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error during OTP verification." });
  }
};

// @desc    Google Auth (dummy placeholder)
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (req, res) => {
  res.json({ message: "Google Auth not implemented yet." });
};