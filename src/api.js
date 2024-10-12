import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Update baseURL if needed
});

// Remove activity from student
export const removeActivityFromStudent = async (studentId, activityId) => {
  try {
    const response = await api.post(`/students/${studentId}/remove-activity`, { activityId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error removing activity');
  }
};

// Get all students
export const getStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching students');
  }
};

// Add a student
export const addStudent = async (student) => {
  try {
    const response = await api.post('/students/add', student);
    return response.data; // Returning the response data directly
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error adding student');
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error deleting student');
  }
};

// Get all activities
export const getActivities = async () => {
  try {
    const response = await api.get('/activities');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching activities');
  }
};

// Add an activity
export const addActivity = async (activity) => {
  try {
    const response = await api.post('/activities/add', activity);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error adding activity');
  }
};

// Delete an activity
export const deleteActivity = async (id) => {
  try {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error deleting activity');
  }
};

// Assign points to a student for an activity
export const assignPoints = async (id, data) => {
  try {
    const response = await api.post(`/students/${id}/add-points`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error assigning points');
  }
};
