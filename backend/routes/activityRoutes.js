const express = require('express');
const router = express.Router();
const Activity = require('../models/activityModel');

// Get all activities
router.get('/', async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

// Add an activity
router.post('/add', async (req, res) => {
  const { name, description, points } = req.body;
  const newActivity = new Activity({ name, description, points });
  await newActivity.save();
  res.json(newActivity);
});

module.exports = router;
