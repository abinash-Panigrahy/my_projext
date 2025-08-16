// controllers/adminController.js
import Hostel from "../models/Hostel.js";
import Room from "../models/Room.js";
import Student from "../models/Student.js";
import asyncHandler from "express-async-handler";

// @desc    Add a new hostel
// @route   POST /api/admin/hostels
// @access  Private (Hostel Admin)
export const addHostel = asyncHandler(async (req, res) => {
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
    owner: req.user._id, // Use 'owner' as per Hostel model
  });

  const savedHostel = await newHostel.save();
  res.status(201).json(savedHostel);
});

// @desc    Add rooms to a hostel
// @route   POST /api/admin/hostels/:id/rooms
// @access  Private (Hostel Admin)
export const addRooms = asyncHandler(async (req, res) => {
  const { roomNumber, capacity, rent, floor, gender } = req.body; // Added floor and gender for Room model
  const hostelId = req.params.id;

  if (!roomNumber || !capacity || !rent || floor === undefined) { // Check for floor
    res.status(400);
    throw new Error("Missing room fields: roomNumber, capacity, rent, and floor are required.");
  }

  const hostel = await Hostel.findById(hostelId);
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found.");
  }

  // Check if roomNumber already exists for this hostel on this floor
  const existingRoom = await Room.findOne({ hostel: hostelId, floor, roomNumber });
  if (existingRoom) {
    res.status(400);
    throw new Error(`Room number ${roomNumber} already exists on floor ${floor} for this hostel.`);
  }

  const room = new Room({
    hostel: hostelId,
    floor,
    roomNumber,
    capacity,
    rent,
    gender,
  });

  const savedRoom = await room.save();

  // Optionally, update the hostel's floors array
  // This depends on how you want to manage rooms within the Hostel model's floors array
  // If you store rooms directly in the Room model, you might not need this.
  // For now, I'll keep it simple and just save the Room.

  res.status(201).json(savedRoom);
});

// @desc    Add a student to a hostel room
// @route   POST /api/admin/hostels/:hostelId/rooms/:roomId/students
// @access  Private (Hostel Admin)
export const addStudent = asyncHandler(async (req, res) => {
  const { name, email, phone, roomNumber: studentRoomNumber } = req.body; // Added studentRoomNumber from body
  const { hostelId, roomId } = req.params;

  if (!name || !email || !phone || !studentRoomNumber) {
    res.status(400);
    throw new Error("Missing student fields: name, email, phone, and roomNumber are required.");
  }

  const room = await Room.findOne({ _id: roomId, hostel: hostelId });
  if (!room) {
    res.status(404);
    throw new Error("Room not found in the specified hostel.");
  }

  if (room.currentOccupancy >= room.capacity) {
    res.status(400);
    throw new Error("Room is already at full capacity.");
  }

  // Check if student with this email or phone already exists in this hostel/room
  const studentExists = await Student.findOne({
    $or: [{ email }, { phone }],
    hostel: hostelId,
  });

  if (studentExists) {
    res.status(400);
    throw new Error("A student with this email or phone already exists in this hostel.");
  }

  const student = new Student({
    name,
    email,
    phone,
    roomNumber: studentRoomNumber, // Use the roomNumber from the body
    hostel: hostelId,
  });

  const savedStudent = await student.save();

  // Update room occupancy and add student to room's students array
  room.currentOccupancy += 1;
  room.students.push(savedStudent._id);
  room.isAvailable = room.currentOccupancy < room.capacity;
  await room.save();

  res.status(201).json(savedStudent);
});

// @desc    Get all hostels managed by current admin
// @route   GET /api/admin/hostels
// @access  Private (Hostel Admin)
export const getMyHostels = asyncHandler(async (req, res) => {
  // Populate 'floors.rooms' or directly rooms depending on your schema usage.
  // Your Hostel model has 'floors' with 'rooms' nested.
  // If you also have a top-level 'Room' collection, you might want to adjust.
  // Assuming 'rooms' in Hostel model is an array of Room documents or ObjectIDs.
  // If 'rooms' are a separate collection, populate them based on hostel ID.
  const hostels = await Hostel.find({ owner: req.user._id })
    .populate({
      path: 'floors.rooms', // Correct path for nested rooms if you populate directly
      model: 'Room' // Specify the model if not explicitly referenced in schema
    })
    // If you intend to populate from the separate Room collection
    // .populate({
    //   path: 'rooms', // Assuming 'rooms' field in Hostel refers to Room model (not in your schema)
    //   model: 'Room',
    //   match: { hostel: req.user._id } // Not correct if rooms are already linked by owner
    // });
    ;
  res.status(200).json(hostels);
});
