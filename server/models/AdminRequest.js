// models/AdminRequest.js
import mongoose from 'mongoose';

const adminRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hostelDetails: {
    name: String,
    address: String,
    city: String,
    images: [String],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('AdminRequest', adminRequestSchema);
