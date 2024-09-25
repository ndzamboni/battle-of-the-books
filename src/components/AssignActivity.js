import React, { useState } from 'react';
import { assignPoints } from '../api';

const AssignActivity = ({ students, activities }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent && selectedActivity) {
      const activity = activities.find((act) => act._id === selectedActivity);
      assignPoints(selectedStudent, { activityId: selectedActivity, points: activity.points }).then(() => {
        alert('Activity assigned successfully');
        setSelectedStudent('');
        setSelectedActivity('');
      });
    } else {
      alert('Please select both student and activity');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Assign Activity to Student</h3>
      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
        required
      >
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.name}
          </option>
        ))}
      </select>

      <select
        value={selectedActivity}
        onChange={(e) => setSelectedActivity(e.target.value)}
        required
      >
        <option value="">Select Activity</option>
        {activities.map((activity) => (
          <option key={activity._id} value={activity._id}>
            {activity.name} - {activity.points} points
          </option>
        ))}
      </select>

      <button type="submit">Assign Activity</button>
    </form>
  );
};

export default AssignActivity;
