import express from "express";
import {
  getHostelAdminDashboard,
  addFloor,
  addRoom,
  updateRoomAvailability,
  addFoodMenu,
  getFoodMenu,
  addStudent,
  getStudents,
  trackRentPayment,
  getHostelDetailsForAdmin,
} from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected and restricted to 'admin' role
router.use(protect, authorizeRoles("admin"));

router.get("/dashboard", getHostelAdminDashboard);
router.get("/hostel", getHostelDetailsForAdmin);
router.post("/hostel/floor", addFloor);
router.post("/hostel/floor/:floorId/room", addRoom);
router.put("/room/:roomId/availability", updateRoomAvailability);
router.post("/food-menu", addFoodMenu);
router.get("/food-menu", getFoodMenu);
router.post("/students", addStudent);
router.get("/students", getStudents);
router.post("/students/:studentId/rent", trackRentPayment);

export default router;