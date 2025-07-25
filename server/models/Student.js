// models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roomNumber: String,
  rentPaid: {
    type: Boolean,
    default: false,
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
  },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
