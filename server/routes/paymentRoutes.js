const express = require("express");
const router = express.Router();

const {
  createSubscription,
  verifySubscription,
  cancelSubscription,
  getUserSubscription,
  payRent,
  getPaymentHistory,
} = require("../controllers/paymentController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

//  User/Hostel Admin: View current subscription
router.get("/subscription", protect, getUserSubscription);

//  Pay rent (for students)
router.post("/rent", protect, authorizeRoles("student"), payRent);

//  Subscription creation (Hostel Admin)
router.post("/subscription", protect, authorizeRoles("hostelAdmin"), createSubscription);

//  Verify subscription payment (Razorpay webhook or post-payment)
router.post("/subscription/verify", protect, authorizeRoles("hostelAdmin"), verifySubscription);

//  Cancel subscription
router.delete("/subscription", protect, authorizeRoles("hostelAdmin"), cancelSubscription);

// View payment history (Admin or Super Admin)
router.get("/history", protect, authorizeRoles("hostelAdmin", "superAdmin"), getPaymentHistory);

module.exports = router;
