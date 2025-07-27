const express = require("express");
const router = express.Router();

const {
  getAllHostels,
  getHostelById,
  createHostel,
  updateHostel,
  deleteHostel,
  addRoomToHostel,
  removeRoomFromHostel,
  updateFoodMenu,
  updateFeeStructure,
  getLiveAvailability,
} = require("../controllers/hostelController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllHostels); // View all hostels
router.get("/:id", getHostelById); // View hostel by ID
router.get("/:id/availability", getLiveAvailability); // Live room availability

// Protected routes - Hostel Admin only
router.post("/", protect, authorizeRoles("hostelAdmin"), createHostel); // Add new hostel
router.put("/:id", protect, authorizeRoles("hostelAdmin"), updateHostel); // Edit hostel
router.delete("/:id", protect, authorizeRoles("hostelAdmin"), deleteHostel); // Delete hostel

router.post(
  "/:id/rooms",
  protect,
  authorizeRoles("hostelAdmin"),
  addRoomToHostel
); // Add room
router.delete(
  "/:id/rooms/:roomId",
  protect,
  authorizeRoles("hostelAdmin"),
  removeRoomFromHostel
); // Remove room

router.put("/:id/food", protect, authorizeRoles("hostelAdmin"), updateFoodMenu); // Update food menu
router.put(
  "/:id/fees",
  protect,
  authorizeRoles("hostelAdmin"),
  updateFeeStructure
); // Update fee structure

module.exports = router;
