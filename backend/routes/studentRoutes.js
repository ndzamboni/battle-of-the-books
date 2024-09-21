const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// Get all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add a student
router.post('/add', async (req, res) => {
  const { name, avatar } = req.body;
  const newStudent = new Student({ name, avatar });
  await newStudent.save();
  res.json(newStudent);
});

// Add points to a student
router.post('/:id/add-points', async (req, res) => {
  const { points, activityId } = req.body;
  const student = await Student.findById(req.params.id);

  student.totalPoints += points;
  student.completedActivities.push({ activityId, pointsEarned: points });
  await student.save();

  res.json(student);
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student' });
  }
});

module.exports = router;
