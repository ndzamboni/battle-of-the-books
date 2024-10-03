const express = require('express');
const router = express.Router();

// Get all activities
router.get('/', async (req, res) => {
  const { data: activities, error } = await req.supabase.from('activities').select('*');
  if (error) return res.status(400).json({ error: 'Error fetching activities' });
  res.json(activities);
});

// Add an activity
router.post('/add', async (req, res) => {
  const { name, description, points } = req.body;
  const { data: newActivity, error } = await req.supabase
    .from('activities')
    .insert({ name, description, points })
    .single();

  if (error) return res.status(400).json({ error: 'Error adding activity' });
  res.json(newActivity);
});

// Delete an activity by ID
router.delete('/:id', async (req, res) => {
  const { error } = await req.supabase
    .from('activities')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ message: 'Error deleting activity' });
  res.json({ message: 'Activity deleted successfully' });
});

module.exports = router;
