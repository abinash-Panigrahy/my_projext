const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  getRecommendedHostels,
  submitFeedback,
  getMyBookings,
} = require("../controllers/userController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

//  All user routes protected
router.use(protect);
router.use(authorizeRoles("user"));

//  Get logged-in user's profile
router.get("/profile", getUserProfile);

//  Update user profile
router.put("/profile", updateUserProfile);

//  Get hostel recommendations for the user
router.get("/recommendations", getRecommendedHostels);

//  Submit feedback/review (generic)
router.post("/feedback", submitFeedback);

//  Get user's booking/payment history (optional)
router.get("/bookings", getMyBookings);

module.exports = router;