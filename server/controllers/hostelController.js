// controllers/hostelController.js
import Hostel from "../models/Hostel.js";
import Room from "../models/Room.js";
import Review from "../models/Review.js";
import asyncHandler from "express-async-handler";

// @desc    Get all approved hostels (for public/user explore page)
// @route   GET /api/hostels
// @access  Public
export const getAllHostels = asyncHandler(async (req, res) => {
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

  const hostels = await Hostel.find(query).populate("owner", "name email"); // Changed 'admin' to 'owner'
  res.status(200).json(hostels);
});

// @desc    Get single hostel by ID with room & review details
// @route   GET /api/hostels/:id
// @access  Public
export const getHostelById = asyncHandler(async (req, res) => {
  const hostelId = req.params.id;
  const hostel = await Hostel.findById(hostelId)
    .populate("owner", "name email") // Changed 'admin' to 'owner'
    .lean(); // Use .lean() for plain JS objects for modification

  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  // Get rooms and reviews separately and attach them
  const rooms = await Room.find({ hostel: hostelId });
  const reviews = await Review.find({ hostel: hostelId }).populate("user", "name");

  hostel.rooms = rooms; // Attach rooms
  hostel.reviews = reviews; // Attach reviews

  res.status(200).json(hostel);
});

// @desc    Check availability of rooms in a hostel
// @route   GET /api/hostels/:id/availability
// @access  Public
export const getAvailability = asyncHandler(async (req, res) => {
  const hostelId = req.params.id;
  const rooms = await Room.find({ hostel: hostelId });

  const availableRooms = rooms.filter(room => room.currentOccupancy < room.capacity);

  res.status(200).json({
    totalRooms: rooms.length,
    totalAvailableCapacity: availableRooms.reduce((acc, room) => acc + (room.capacity - room.currentOccupancy), 0),
    availableRooms: availableRooms.map(room => ({
      _id: room._id,
      roomNumber: room.roomNumber,
      floor: room.floor,
      capacity: room.capacity,
      currentOccupancy: room.currentOccupancy,
      availableSpots: room.capacity - room.currentOccupancy,
      rent: room.rent,
      gender: room.gender,
    })),
  });
});