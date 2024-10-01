import React, { useState } from 'react';
import { assignPoints } from '../api';

const AssignActivity = ({ students, setStudents, activities }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudent && selectedActivity) {
      const activity = activities.find((act) => act._id === selectedActivity);

      try {
        // Send request to assign points to the student
        const response = await assignPoints(selectedStudent, {
          activityId: selectedActivity,
          points: activity.points,
        });
        
        // Get the updated student data from the response
        const updatedStudent = response.data.student;

        // Update the state with the updated student data
        setStudents((prevStudents) => 
          prevStudents.map((student) => 
            student._id === updatedStudent._id ? updatedStudent : student
          )
        );

        alert('Activity assigned and badges updated');
        setSelectedStudent('');
        setSelectedActivity('');
      } catch (error) {
        console.error('Error assigning activity:', error);
        alert('Failed to assign activity');
      }
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
