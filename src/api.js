import { supabase } from './supabaseClient'; // Import the Supabase client

// Remove activity from student
export const removeActivityFromStudent = async (studentId, activityId) => {
  // Fetch the student
  const { data: student, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .single();
  
  if (error) throw new Error(error.message);

  // Remove the activity from the student's completed activities
  const updatedActivities = student.completedActivities.filter(
    (activity) => activity.activityId !== activityId
  );

  // Update the student with the new activities list
  const { data, error: updateError } = await supabase
    .from('students')
    .update({ completedActivities: updatedActivities })
    .eq('id', studentId);

  if (updateError) throw new Error(updateError.message);

  return data;
};

// Get all students
export const getStudents = async () => {
  const { data, error } = await supabase.from('students').select('*');
  if (error) throw new Error(error.message);
  return data;
};

// Add a student
export const addStudent = async (student) => {
  const { data, error } = await supabase.from('students').insert([student]);
  if (error) throw new Error(error.message);
  return data;
};

// Delete a student
export const deleteStudent = async (id) => {
  const { data, error } = await supabase.from('students').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return data;
};

// Get all activities
export const getActivities = async () => {
  const { data, error } = await supabase.from('activities').select('*');
  if (error) throw new Error(error.message);
  return data;
};

// Add an activity
export const addActivity = async (activity) => {
  const { data, error } = await supabase.from('activities').insert([activity]);
  if (error) throw new Error(error.message);
  return data;
};

// Delete an activity
export const deleteActivity = async (id) => {
  const { data, error } = await supabase.from('activities').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return data;
};

// Assign points to a student for an activity
export const assignPoints = async (id, data) => {
  // Fetch the student
  const { data: student, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(error.message);

  // Update the student's total points and add the completed activity
  const updatedPoints = student.totalPoints + data.points;
  const updatedActivities = [
    ...student.completedActivities,
    { activityId: data.activityId, pointsEarned: data.points },
  ];

  // Update the student with new points and activities
  const { data: updatedStudent, error: updateError } = await supabase
    .from('students')
    .update({ totalPoints: updatedPoints, completedActivities: updatedActivities })
    .eq('id', id);

  if (updateError) throw new Error(updateError.message);

  return updatedStudent;
};
