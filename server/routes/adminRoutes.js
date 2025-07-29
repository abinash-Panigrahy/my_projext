const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/adminController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

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

module.exports = router;
 