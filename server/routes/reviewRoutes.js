// routes/reviewRoutes.js

import express from "express";
import {
  createReview,
  getHostelReviews,
  updateReview,
  deleteReview,
  getAllReviews,
} from "../controllers/reviewController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

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

export default router;
