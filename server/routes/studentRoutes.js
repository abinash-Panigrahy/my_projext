// routes/studentRoutes.js
import express from 'express';
import { addStudent, getStudentsByHostel } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addStudent);
router.get('/:hostelId', protect, getStudentsByHostel);

// export default router;
module.exports = router;
// IGNORE: export default router;
