import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Remove activity from student
export const removeActivityFromStudent = (studentId, activityId) => {
  return api.post(`/students/${studentId}/remove-activity`, { activityId });
};

export const getStudents = () => api.get('/students');
export const addStudent = (student) => api.post('/students/add', student);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export const getActivities = () => api.get('/activities');
export const addActivity = (activity) => api.post('/activities/add', activity);
export const deleteActivity = (id) => api.delete(`/activities/${id}`);

export const assignPoints = (id, data) => api.post(`/students/${id}/add-points`, data);
