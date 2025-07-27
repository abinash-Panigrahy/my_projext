const express = require("express");
const router = express.Router();

const {
  getPendingAdminRequests,
  approveAdminRequest,
  rejectAdminRequest,
  getAllUsers,
  updateUserRole,
  deleteUser,
  banHostel,
  getSubscriptions,
} = require("../controllers/superAdminController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// 🔐 All routes protected with superAdmin role
router.use(protect);
router.use(authorizeRoles("superAdmin"));

// 📥 Get all pending hostel admin requests
router.get("/admin-requests", getPendingAdminRequests);

// ✅ Approve a hostel admin request
router.put("/admin-requests/approve/:requestId", approveAdminRequest);

// ❌ Reject a hostel admin request
router.delete("/admin-requests/reject/:requestId", rejectAdminRequest);

// 👥 Get all users (admins, students, etc.)
router.get("/users", getAllUsers);

//  Change a user role (e.g., user → admin)
router.put("/users/:userId/role", updateUserRole);

//  Delete a user
router.delete("/users/:userId", deleteUser);

//  Ban a hostel or mark inactive
router.put("/ban-hostel/:hostelId", banHostel);

// 📊Get all hostel subscription statuses
router.get("/subscriptions", getSubscriptions);

module.exports = router;