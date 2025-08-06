const asyncHandler = require("express-async-handler");
const Hostel = require("../models/Hostel");
const Room = require("../models/Room");
const Student = require("../models/Student");

// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
exports.getHostelAdminDashboard = asyncHandler(async (req, res) => {
  const hostels = await Hostel.find({ admin: req.user._id }).populate("rooms");
  const totalHostels = hostels.length;

  const totalRooms = await Room.countDocuments({ hostel: { $in: hostels.map(h => h._id) } });
  const totalStudents = await Student.countDocuments({ hostel: { $in: hostels.map(h => h._id) } });

  res.status(200).json({
    totalHostels,
    totalRooms,
    totalStudents,
    hostels,
  });
});

// @desc    Get hostel details for admin
// @route   GET /api/admin/hostel
// @access  Private (Admin)
exports.getHostelDetailsForAdmin = asyncHandler(async (req, res) => {
  const hostel = await Hostel.findOne({ admin: req.user._id }).populate("rooms");

  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  res.status(200).json(hostel);
});

// @desc    Add a new floor to hostel
// @route   POST /api/admin/hostel/floor
// @access  Private (Admin)
exports.addFloor = asyncHandler(async (req, res) => {
  const { floorNumber } = req.body;

  const hostel = await Hostel.findOne({ admin: req.user._id });
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  hostel.floors.push({ floorNumber, rooms: [] });
  await hostel.save();

  res.status(201).json({ message: "Floor added", hostel });
});

// @desc    Add a room to a specific floor
// @route   POST /api/admin/hostel/floor/:floorId/room
// @access  Private (Admin)
exports.addRoom = asyncHandler(async (req, res) => {
  const { roomNumber, capacity, rent } = req.body;
  const { floorId } = req.params;

  const hostel = await Hostel.findOne({ admin: req.user._id });
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  const floor = hostel.floors.id(floorId);
  if (!floor) {
    res.status(404);
    throw new Error("Floor not found");
  }

  const room = new Room({
    hostel: hostel._id,
    floor: floorId,
    roomNumber,
    capacity,
    rent,
    availability: true,
  });

  const savedRoom = await room.save();
  floor.rooms.push(savedRoom._id);
  await hostel.save();

  res.status(201).json(savedRoom);
});

// @desc    Update room availability
// @route   PUT /api/admin/room/:roomId/availability
// @access  Private (Admin)
exports.updateRoomAvailability = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { availability } = req.body;

  const room = await Room.findById(roomId);
  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  room.availability = availability;
  await room.save();

  res.status(200).json({ message: "Room availability updated", room });
});

// @desc    Add food menu
// @route   POST /api/admin/food-menu
// @access  Private (Admin)
exports.addFoodMenu = asyncHandler(async (req, res) => {
  const { menu } = req.body;

  const hostel = await Hostel.findOne({ admin: req.user._id });
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  hostel.foodMenu = menu;
  await hostel.save();

  res.status(201).json({ message: "Food menu added", menu });
});

// @desc    Get food menu
// @route   GET /api/admin/food-menu
// @access  Private (Admin)
exports.getFoodMenu = asyncHandler(async (req, res) => {
  const hostel = await Hostel.findOne({ admin: req.user._id });
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  res.status(200).json({ foodMenu: hostel.foodMenu || [] });
});

// @desc    Add student to hostel
// @route   POST /api/admin/students
// @access  Private (Admin)
exports.addStudent = asyncHandler(async (req, res) => {
  const { name, email, phone, roomId } = req.body;

  const room = await Room.findById(roomId);
  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  const student = new Student({
    name,
    email,
    phone,
    room: roomId,
    hostel: room.hostel,
  });

  const savedStudent = await student.save();
  res.status(201).json(savedStudent);
});

// @desc    Get all students in hostel
// @route   GET /api/admin/students
// @access  Private (Admin)
exports.getStudents = asyncHandler(async (req, res) => {
  const hostel = await Hostel.findOne({ admin: req.user._id });
  if (!hostel) {
    res.status(404);
    throw new Error("Hostel not found");
  }

  const students = await Student.find({ hostel: hostel._id });
  res.status(200).json(students);
});

// @desc    Track student rent payment
// @route   POST /api/admin/students/:studentId/rent
// @access  Private (Admin)
exports.trackRentPayment = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { month, amount, status } = req.body;

  const student = await Student.findById(studentId);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  student.rentPayments.push({
    month,
    amount,
    status,
    paidOn: new Date(),
  });

  await student.save();
  res.status(201).json({ message: "Rent payment recorded", rentPayments: student.rentPayments });
});
