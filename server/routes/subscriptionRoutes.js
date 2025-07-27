// routes/subscriptionRoutes.js
import express from 'express';
import { createSubscription, getUserSubscription } from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createSubscription);
router.get('/:userId', protect, getUserSubscription);

// export default router;
module.exports = router;

