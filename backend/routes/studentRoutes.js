const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// Get all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add a student route
router.post('/add', async (req, res) => {
  const { name, avatar, color } = req.body;

  try {
    const newStudent = new Student({ name, avatar, color });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: 'Error adding student' });
  }
});

// Add points to a student and award badges if necessary
router.post('/:id/add-points', async (req, res) => {
  const { points, activityId } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Add points to the student's total
    student.totalPoints += points;

    // Check if activityId is provided, and add the activity
    if (activityId) {
      student.completedActivities.push({ activityId, pointsEarned: points });
    }

    // Badge earning logic
    const badgesToAward = [];
    
    // Points-based badge: Award 1 badge for every 50 points
    const pointsBadgeCount = Math.floor(student.totalPoints / 50);
    const currentPointsBadges = student.badges.filter(badge => badge.startsWith('Points Badge')).length;

    if (pointsBadgeCount > currentPointsBadges) {
      const pointsBadge = `Points Badge ${pointsBadgeCount * 50}`;
      badgesToAward.push(pointsBadge);
      student.badges.push(pointsBadge);
    }

    // Activity-based badge: Award 1 badge for every 5 completed activities
    const activityBadgeCount = Math.floor(student.completedActivities.length / 5);
    const currentActivityBadges = student.badges.filter(badge => badge.startsWith('Activity Badge')).length;

    if (activityBadgeCount > currentActivityBadges) {
      const activityBadge = `Activity Badge ${activityBadgeCount * 5} Activities`;
      badgesToAward.push(activityBadge);
      student.badges.push(activityBadge);
    }

    await student.save();

    res.status(200).json({ student, earnedBadges: badgesToAward });
  } catch (error) {
    res.status(400).json({ error: 'Error assigning points' });
  }
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
