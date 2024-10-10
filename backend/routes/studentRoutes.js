const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel'); // Mongoose Student model

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching students' });
  }
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
  const timestamp = new Date();

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.totalPoints += points;
    student.completedActivities.push({ activityId, pointsEarned: points, timestamp });

    const badgesToAward = [];

    // Points-Based Milestone Badges
    if (student.totalPoints >= 100 && !student.badges.includes('100 Points Badge')) {
      badgesToAward.push('100 Points Badge');
      student.badges.push('100 Points Badge');
    }
    if (student.totalPoints >= 500 && !student.badges.includes('500 Points Badge')) {
      badgesToAward.push('500 Points Badge');
      student.badges.push('500 Points Badge');
    }
    if (student.totalPoints >= 1000 && !student.badges.includes('1,000 Points Badge')) {
      badgesToAward.push('1,000 Points Badge');
      student.badges.push('1,000 Points Badge');
    }
    if (student.totalPoints >= 2000 && !student.badges.includes('2,000 Points Badge')) {
      badgesToAward.push('2,000 Points Badge');
      student.badges.push('2,000 Points Badge');
    }

    // Activity-Based Milestone Badges
    if (student.completedActivities.length >= 10 && !student.badges.includes('10 Activities Badge')) {
      badgesToAward.push('10 Activities Badge');
      student.badges.push('10 Activities Badge');
    }
    if (student.completedActivities.length >= 50 && !student.badges.includes('50 Activities Badge')) {
      badgesToAward.push('50 Activities Badge');
      student.badges.push('50 Activities Badge');
    }
    if (student.completedActivities.length >= 100 && !student.badges.includes('100 Activities Badge')) {
      badgesToAward.push('100 Activities Badge');
      student.badges.push('100 Activities Badge');
    }

    // Streak-Based Badges (consecutive days)
    if (student.completedActivities.length > 1) {
      const lastActivityDate = new Date(student.completedActivities[student.completedActivities.length - 2]?.timestamp);
      const currentActivityDate = new Date(timestamp);
      const daysDiff = Math.ceil((currentActivityDate - lastActivityDate) / (1000 * 60 * 60 * 24));

      if (daysDiff === 1) {
        student.streak = (student.streak || 0) + 1;
      } else {
        student.streak = 1;  // Reset streak if not consecutive
      }

      // Award streak badges based on streak length
      if (student.streak >= 3 && !student.badges.includes('3-Day Streak Badge')) {
        badgesToAward.push('3-Day Streak Badge');
        student.badges.push('3-Day Streak Badge');
      }
      if (student.streak >= 7 && !student.badges.includes('Week Streak Badge')) {
        badgesToAward.push('Week Streak Badge');
        student.badges.push('Week Streak Badge');
      }
    }

    await student.save();
    res.status(200).json({ student, earnedBadges: badgesToAward });
  } catch (error) {
    res.status(400).json({ error: 'Error updating student' });
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
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const activityToRemove = student.completedActivities.find(activity => activity.activityId.toString() === activityId);
    if (activityToRemove) {
      student.totalPoints -= activityToRemove.pointsEarned;  // Subtract the points from the student's total
    }

    student.completedActivities = student.completedActivities.filter(activity => activity.activityId.toString() !== activityId);

    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: 'Error removing activity' });
  }
});

module.exports = router;
