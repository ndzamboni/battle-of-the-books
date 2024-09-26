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
  const { points, activityId, timestamp } = req.body;  // Include timestamp for streak badges
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

    const badgesToAward = [];

    // Points-Based Milestone Badges
    if (student.totalPoints >= 1000 && !student.badges.includes("1,000 Points Badge")) {
      badgesToAward.push("1,000 Points Badge");
      student.badges.push("1,000 Points Badge");
    }

    // Activity Milestone Badge (50 Activities)
    if (student.completedActivities.length >= 50 && !student.badges.includes("50 Activities Badge")) {
      badgesToAward.push("50 Activities Badge");
      student.badges.push("50 Activities Badge");
    }

    // Streak-Based Badges (consecutive days)
    if (timestamp) {
      const lastActivityDate = new Date(student.completedActivities[student.completedActivities.length - 1]?.timestamp);
      const currentDate = new Date(timestamp);
      const timeDiff = Math.abs(currentDate - lastActivityDate);
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (daysDiff === 1) {
        student.streak = (student.streak || 0) + 1;
      } else {
        student.streak = 1;  // Reset streak if days are not consecutive
      }

      // Award streak badges based on streak length
      if (student.streak >= 3 && !student.badges.includes("3-Day Streak Badge")) {
        badgesToAward.push("3-Day Streak Badge");
        student.badges.push("3-Day Streak Badge");
      }
      if (student.streak >= 7 && !student.badges.includes("Week Streak Badge")) {
        badgesToAward.push("Week Streak Badge");
        student.badges.push("Week Streak Badge");
      }
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

// Remove a completed activity from a student
router.post('/:id/remove-activity', async (req, res) => {
  const { activityId } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Remove the activity by filtering it out from the completedActivities array
    student.completedActivities = student.completedActivities.filter(activity => activity.activityId.toString() !== activityId);

    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: 'Error removing activity' });
  }
});


module.exports = router;
