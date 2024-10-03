const express = require('express');
const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  const { data: students, error } = await req.supabase.from('students').select('*');
  if (error) return res.status(400).json({ error: 'Error fetching students' });
  res.json(students);
});

// Add a student route
router.post('/add', async (req, res) => {
  const { name, avatar, color } = req.body;
  const { data: newStudent, error } = await req.supabase
    .from('students')
    .insert({ name, avatar, color })
    .single();
  if (error) return res.status(400).json({ error: 'Error adding student' });
  res.status(201).json(newStudent);
});

// Add points to a student and award badges if necessary
router.post('/:id/add-points', async (req, res) => {
  const { points, activityId } = req.body;
  const timestamp = new Date();  // Ensure timestamp is set when assigning points
  
  const { data: student, error: findError } = await req.supabase
    .from('students')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (findError || !student) return res.status(404).json({ error: 'Student not found' });

  const updatedPoints = student.totalPoints + points;
  const updatedActivities = [...student.completedActivities, { activityId, pointsEarned: points, timestamp }];

  const badgesToAward = [];

  // Points-Based Milestone Badges
  if (updatedPoints >= 100 && !student.badges.includes('100 Points Badge')) {
    badgesToAward.push('100 Points Badge');
  }
  if (updatedPoints >= 500 && !student.badges.includes('500 Points Badge')) {
    badgesToAward.push('500 Points Badge');
  }
  if (updatedPoints >= 1000 && !student.badges.includes('1,000 Points Badge')) {
    badgesToAward.push('1,000 Points Badge');
  }
  if (updatedPoints >= 2000 && !student.badges.includes('2,000 Points Badge')) {
    badgesToAward.push('2,000 Points Badge');
  }

  // Activity-Based Milestone Badges
  if (updatedActivities.length >= 10 && !student.badges.includes('10 Activities Badge')) {
    badgesToAward.push('10 Activities Badge');
  }
  if (updatedActivities.length >= 50 && !student.badges.includes('50 Activities Badge')) {
    badgesToAward.push('50 Activities Badge');
  }
  if (updatedActivities.length >= 100 && !student.badges.includes('100 Activities Badge')) {
    badgesToAward.push('100 Activities Badge');
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
    }
    if (student.streak >= 7 && !student.badges.includes('Week Streak Badge')) {
      badgesToAward.push('Week Streak Badge');
    }
  }

  const updatedBadges = [...student.badges, ...badgesToAward];

  const { data: updatedStudent, error: updateError } = await req.supabase
    .from('students')
    .update({
      totalPoints: updatedPoints,
      completedActivities: updatedActivities,
      badges: updatedBadges
    })
    .eq('id', req.params.id)
    .single();

  if (updateError) return res.status(400).json({ error: 'Error updating student' });

  res.status(200).json({ student: updatedStudent, earnedBadges: badgesToAward });
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  const { error } = await req.supabase
    .from('students')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(500).json({ message: 'Error deleting student' });
  res.json({ message: 'Student deleted successfully' });
});

// Remove a completed activity from a student
router.post('/:id/remove-activity', async (req, res) => {
  const { activityId } = req.body;
  const { data: student, error: findError } = await req.supabase
    .from('students')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (findError || !student) return res.status(404).json({ error: 'Student not found' });

  const updatedActivities = student.completedActivities.filter(activity => activity.activityId !== activityId);

  const { data: updatedStudent, error: updateError } = await req.supabase
    .from('students')
    .update({ completedActivities: updatedActivities })
    .eq('id', req.params.id)
    .single();

  if (updateError) return res.status(400).json({ error: 'Error removing activity' });
  res.status(200).json(updatedStudent);
});

module.exports = router;
