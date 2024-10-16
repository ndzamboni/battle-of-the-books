const express = require('express');
const router = express.Router();
const Activity = require('../models/activityModel'); // Import your activity Mongoose model

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching activities' });
  }
});

// Add an activity
router.post('/add', async (req, res) => {
  const { name, description, points } = req.body;
  try {
    const newActivity = new Activity({ name, description, points });
    await newActivity.save();
    res.json(newActivity);
  } catch (error) {
    res.status(400).json({ error: 'Error adding activity' });
  }
});

// Delete an activity by ID
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity' });
  }
});

module.exports = router;
