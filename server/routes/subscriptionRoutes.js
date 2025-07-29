const express = require('express');
const router = express.Router();

const {
  createSubscription,
  getUserSubscription,
} = require('../controllers/subscriptionController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createSubscription);
router.get('/:userId', protect, getUserSubscription);

module.exports = router;
