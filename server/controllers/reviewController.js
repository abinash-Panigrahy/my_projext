const Hostel = require("../models/Hostel");
const Room = require("../models/Room");
const Review = require("../models/Review");
const asyncHandler = require("express-async-handler");

// @desc    Get all approved hostels (for public/user explore page)
// @route   GET /api/hostels
// @access  Public
exports.getAllHostels = asyncHandler(async (req, res) => {
  const { city, search } = req.query;

  const query = {
    isApproved: true, // Only approved hostels
  };

  if (city) {
    query.city = { $regex: new RegExp(city, "i") };
  }

  if (search) {
    query.name = { $regex: new RegExp(search, "i") };
  }

  const hostels = await Hostel.find(query).populate("admin", "name email");

  res.status(200).json(hostels);
});

// @desc    Get single hostel by ID with room & review details
// @route   GET /api/hostels/:id
// @access  Public
exports.getHostelById = asyncHandler(async (req, res) => {
  const hostelId = req.params.id;

  const hostel = await Hostel.findById(hostelId)
    .populate("admin", "name email")
    .lean();

  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  // Get rooms and reviews
  const rooms = await Room.find({ hostel: hostelId });
  const reviews = await Review.find({ hostel: hostelId }).populate("user", "name");

  hostel.rooms = rooms;
  hostel.reviews = reviews;

  res.status(200).json(hostel);
});

// @desc    Check availability of rooms in a hostel
// @route   GET /api/hostels/:id/availability
// @access  Public
exports.getAvailability = asyncHandler(async (req, res) => {
  const hostelId = req.params.id;

  const rooms = await Room.find({ hostel: hostelId });
  const availableRooms = rooms.filter(room => room.capacity > 0);

  res.status(200).json({
    total: rooms.length,
    available: availableRooms.length,
    availableRooms,
  });
});
