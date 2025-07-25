// models/Hostel.js
import mongoose from 'mongoose';

const floorSchema = new mongoose.Schema({
  floorNumber: Number,
  rooms: [
    {
      roomNumber: String,
      capacity: Number,
      currentOccupancy: { type: Number, default: 0 },
      rent: Number,
    },
  ],
});

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  city: { type: String, required: true },
  images: [String],
  foodMenu: [String],
  rules: [String],
  isApproved: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  floors: [floorSchema],
}, { timestamps: true });

export default mongoose.model('Hostel', hostelSchema);
