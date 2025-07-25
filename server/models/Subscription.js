// models/Subscription.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan: {
    type: String,
    enum: ['monthly', 'bimonthly', 'yearly'],
    required: true,
  },
  startDate: Date,
  endDate: Date,
  isActive: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Subscription', subscriptionSchema);
