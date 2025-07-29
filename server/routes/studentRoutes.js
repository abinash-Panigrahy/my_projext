const express = require('express');
const router = express.Router();

const {
  addStudent,
  getStudentsByHostel,
} = require('../controllers/studentController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addStudent);
router.get('/:hostelId', protect, getStudentsByHostel);

module.exports = router;
