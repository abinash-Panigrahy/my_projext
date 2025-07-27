// controllers/studentController.js
import Student from '../models/Student.js';

export const addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student added', student });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add student', error: err.message });
  }
};

export const getStudentsByHostel = async (req, res) => {
  try {
    const students = await Student.find({ hostel: req.params.hostelId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving students', error: err.message });
  }
};
