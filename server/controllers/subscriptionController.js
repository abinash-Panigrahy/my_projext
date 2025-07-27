// controllers/subscriptionController.js
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

export const createSubscription = async (req, res) => {
  try {
    const { userId, plan, amount, duration } = req.body;

    const subscription = new Subscription({
      user: userId,
      plan,
      amount,
      duration,
      startDate: new Date(),
    });

    await subscription.save();

    res.status(201).json({ message: 'Subscription created', subscription });
  } catch (err) {
    res.status(500).json({ message: 'Error creating subscription', error: err.message });
  }
};

export const getUserSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.params.userId });
    if (!subscription) return res.status(404).json({ message: 'No subscription found' });

    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subscription', error: err.message });
  }
};
