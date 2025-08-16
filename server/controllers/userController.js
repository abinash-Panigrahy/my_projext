import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Hostel from "../models/Hostel.js";
import Review from "../models/Review.js";
// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private (user only)
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (user only)
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;

  const updatedUser = await user.save();
  res.status(200).json({
    message: "Profile updated successfully",
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    },
  });
});

// @desc    Get hostel recommendations for user
// @route   GET /api/users/recommendations
// @access  Private (user only)
export const getRecommendedHostels = asyncHandler(async (req, res) => {
  // Basic recommendation logic: return hostels in user's preferred city
  const user = await User.findById(req.user.id);
  if (!user || !user.city) {
    res.status(400);
    throw new Error("User city not specified for recommendations");
  }

  const hostels = await Hostel.find({ city: user.city }).limit(10);
  res.status(200).json(hostels);
});

// @desc    Submit feedback
// @route   POST /api/users/feedback
// @access  Private (user only)
export const submitFeedback = asyncHandler(async (req, res) => {
  const { hostelId, rating, comment } = req.body;

  if (!hostelId || !rating || !comment) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const hostel = await Hostel.findById(hostelId);
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  const review = new Review({
    user: req.user.id,
    hostel: hostelId,
    rating,
    comment,
  });

  await review.save();
  res.status(201).json({ message: "Feedback submitted successfully" });
});

// @desc    Get user booking/payment history
// @route   GET /api/users/bookings
// @access  Private (user only)
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(bookings);
});
