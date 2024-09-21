const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Updated mongoose connection (removed deprecated options)
mongoose.connect('mongodb://localhost:27017/battle-of-books');

// Routes
app.use('/students', studentRoutes);
app.use('/activities', activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
