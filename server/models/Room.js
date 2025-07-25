// models/Room.js
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  currentOccupancy: {
    type: Number,
    default: 0,
  },
  rent: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unisex'],
    default: 'unisex',
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
}, { timestamps: true });

roomSchema.index({ hostel: 1, roomNumber: 1 }, { unique: true });

export default mongoose.model('Room', roomSchema);
