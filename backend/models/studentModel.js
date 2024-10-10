const mongoose = require('mongoose');

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String }, // Image URL
  color: String,  // Ensure the color field is part of the student schema
  totalPoints: { type: Number, default: 0 },
  badges: [{ type: String }], // List of badges earned
  completedActivities: [
    {
      activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
      pointsEarned: { type: Number },
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);
