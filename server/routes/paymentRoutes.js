// routes/paymentRoutes.js

import express from "express";
import {
  createSubscription,
  verifySubscription,
  cancelSubscription,
  getUserSubscription,
  payRent,
  getPaymentHistory,
} from "../controllers/paymentController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// User/Hostel Admin: View current subscription
router.get("/subscription", protect, getUserSubscription);

// Pay rent (for students)
router.post("/rent", protect, authorizeRoles("student"), payRent);

// Subscription creation (Hostel Admin)
router.post("/subscription", protect, authorizeRoles("hostelAdmin"), createSubscription);

// Verify subscription payment
router.post("/subscription/verify", protect, authorizeRoles("hostelAdmin"), verifySubscription);

// Cancel subscription
router.delete("/subscription", protect, authorizeRoles("hostelAdmin"), cancelSubscription);

// View payment history (Admin or Super Admin)
router.get("/history", protect, authorizeRoles("hostelAdmin", "superAdmin"), getPaymentHistory);

export default router;
