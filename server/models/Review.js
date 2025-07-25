// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
