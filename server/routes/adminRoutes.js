const express = require("express");
const router = express.Router();
const {
  addHostel,
  addRooms,
  addStudent,
  getMyHostels,
} = require("../controllers/adminController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Apply middleware to all routes below
router.use(protect, authorizeRoles("admin"));

// @route POST /api/admin/hostels
router.post("/hostels", addHostel);

// @route POST /api/admin/hostels/:id/rooms
router.post("/hostels/:id/rooms", addRooms);

// @route POST /api/admin/hostels/:hostelId/rooms/:roomId/students
router.post("/hostels/:hostelId/rooms/:roomId/students", addStudent);

// @route GET /api/admin/hostels
router.get("/hostels", getMyHostels);

module.exports = router;
