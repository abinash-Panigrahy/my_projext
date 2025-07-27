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

//  Create a review (Only logged-in users who stayed in hostel)
router.post("/:hostelId", protect, authorizeRoles("user", "student"), createReview);

//  Get all reviews for a specific hostel (Public)
router.get("/hostel/:hostelId", getHostelReviews);

//  Update a user's own review
router.put("/:reviewId", protect, authorizeRoles("user", "student"), updateReview);

//  Delete own review or allow admin/super admin to delete any
router.delete("/:reviewId", protect, authorizeRoles("user", "student", "admin", "superAdmin"), deleteReview);

//  (Optional) Get all reviews (for SuperAdmin Panel analytics, moderation)
router.get("/", protect, authorizeRoles("superAdmin"), getAllReviews);

// module.exports = router;

export default router;
