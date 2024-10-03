const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js'); // Import Supabase client
const studentRoutes = require('./routes/studentRoutes');
const activityRoutes = require('./routes/activityRoutes');
require('dotenv').config(); // Ensure this line is added to load .env variables


const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

// Pass the Supabase client to your routes
app.use('/students', (req, res, next) => {
  req.supabase = supabase;
  next();
}, studentRoutes);

app.use('/activities', (req, res, next) => {
  req.supabase = supabase;
  next();
}, activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
