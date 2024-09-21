const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  points: { type: Number, required: true },
});

module.exports = mongoose.model('Activity', activitySchema);
