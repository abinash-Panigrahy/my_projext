const Hostel = require("../models/Hostel");
const Room = require("../models/Room");
const Student = require("../models/Student");
const asyncHandler = require("express-async-handler");

// @desc    Add a new hostel
// @route   POST /api/admin/hostels
// @access  Private (Hostel Admin)
exports.addHostel = asyncHandler(async (req, res) => {
  const { name, address, city, rules } = req.body;

  if (!name || !address || !city) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const newHostel = new Hostel({
    name,
    address,
    city,
    rules,
    admin: req.user._id,
  });

  const savedHostel = await newHostel.save();
  res.status(201).json(savedHostel);
});

// @desc    Add rooms to a hostel
// @route   POST /api/admin/hostels/:id/rooms
// @access  Private (Hostel Admin)
exports.addRooms = asyncHandler(async (req, res) => {
  const { roomNumber, capacity, rent } = req.body;
  const hostelId = req.params.id;

  if (!roomNumber || !capacity || !rent) {
    res.status(400);
    throw new Error("Missing room fields.");
  }

  const hostel = await Hostel.findById(hostelId);
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found.");
  }

  const room = new Room({
    hostel: hostelId,
    roomNumber,
    capacity,
    rent,
  });

  const savedRoom = await room.save();
  res.status(201).json(savedRoom);
});

// @desc    Add a student to a hostel room
// @route   POST /api/admin/hostels/:hostelId/rooms/:roomId/students
// @access  Private (Hostel Admin)
exports.addStudent = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const { hostelId, roomId } = req.params;

  const room = await Room.findOne({ _id: roomId, hostel: hostelId });
  if (!room) {
    res.status(404);
    throw new Error("Room not found.");
  }

  const student = new Student({
    name,
    email,
    phone,
    room: roomId,
    hostel: hostelId,
  });

  const savedStudent = await student.save();
  res.status(201).json(savedStudent);
});

// @desc    Get all hostels managed by current admin
// @route   GET /api/admin/hostels
// @access  Private (Hostel Admin)
exports.getMyHostels = asyncHandler(async (req, res) => {
  const hostels = await Hostel.find({ admin: req.user._id }).populate("rooms");
  res.status(200).json(hostels);
});
