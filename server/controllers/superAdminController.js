const asyncHandler = require("express-async-handler");
const Hostel = require("../models/Hostel");
const User = require("../models/User");

// @desc    Get all hostel account requests (pending approval)
// @route   GET /api/superadmin/hostel-requests
// @access  Private (Super Admin)
exports.getPendingHostelRequests = asyncHandler(async (req, res) => {
  const pendingHostels = await Hostel.find({ isApproved: false }).populate("owner", "name email");
  res.status(200).json(pendingHostels);
});

// @desc    Approve a hostel account
// @route   PATCH /api/superadmin/approve-hostel/:hostelId
// @access  Private (Super Admin)
exports.approveHostel = asyncHandler(async (req, res) => {
  const { hostelId } = req.params;

  const hostel = await Hostel.findById(hostelId);
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  hostel.isApproved = true;
  await hostel.save();

  res.status(200).json({ message: "Hostel account approved successfully" });
});

// @desc    Reject/Delete a hostel account
// @route   DELETE /api/superadmin/reject-hostel/:hostelId
// @access  Private (Super Admin)
exports.rejectHostel = asyncHandler(async (req, res) => {
  const { hostelId } = req.params;

  const hostel = await Hostel.findById(hostelId);
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  await hostel.deleteOne();
  res.status(200).json({ message: "Hostel account rejected and removed" });
});

// @desc    Get all users and hostel owners
// @route   GET /api/superadmin/users
// @access  Private (Super Admin)
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.status(200).json(users);
});

// @desc    Update a user's role (e.g. promote to admin)
// @route   PATCH /api/superadmin/update-role/:userId
// @access  Private (Super Admin)
exports.updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!["user", "admin", "superadmin"].includes(role)) {
    res.status(400);
    throw new Error("Invalid role provided");
  }

  user.role = role;
  await user.save();

  res.status(200).json({ message: "User role updated", user });
});
