// routes/adminRoutes.js

import express from "express";
import {
  addHostel,
  addRooms,
  addStudent,
  getMyHostels,
} from "../controllers/adminController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

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

export default router;
