import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
});

// Get all students
export const getStudents = async () => {
  const { data } = await api.get('/students');
  return data;
};

// Add a student
export const addStudent = async (student) => {
  const { data } = await api.post('/students/add', student);
  return data;
};

// Delete a student
export const deleteStudent = async (id) => {
  const { data } = await api.delete(`/students/${id}`);
  return data;
};

// Get all activities
export const getActivities = async () => {
  const { data } = await api.get('/activities');
  return data;
};

// Add an activity
export const addActivity = async (activity) => {
  const { data } = await api.post('/activities/add', activity);
  return data;
};

// Delete an activity
export const deleteActivity = async (id) => {
  const { data } = await api.delete(`/activities/${id}`);
  return data;
};

// Assign points to a student
export const assignPoints = async (id, data) => {
  const { data: updatedStudent } = await api.post(`/students/${id}/add-points`, data);
  return updatedStudent;
};
