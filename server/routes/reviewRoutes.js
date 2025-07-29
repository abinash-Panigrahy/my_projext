const express = require("express");
const router = express.Router();

const {
  createReview,
  getHostelReviews,
  updateReview,
  deleteReview,
  getAllReviews,
} = require("../controllers/reviewController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Create review for a hostel
router.post("/:hostelId", protect, authorizeRoles("user", "student"), createReview);

// Get all reviews for a hostel
router.get("/hostel/:hostelId", getHostelReviews);

// Update a specific review
router.put("/:reviewId", protect, authorizeRoles("user", "student"), updateReview);

// Delete a review (user who posted or admin/superAdmin)
router.delete("/:reviewId", protect, authorizeRoles("user", "student", "admin", "superAdmin"), deleteReview);

// Get all reviews (for superAdmin)
router.get("/", protect, authorizeRoles("superAdmin"), getAllReviews);

module.exports = router;
