import React, { useEffect, useState } from 'react';
import { getStudents, getActivities, assignPoints } from '../api';

const AssignActivity = () => {
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Fetch students and activities when the component loads
    getStudents().then((response) => setStudents(response.data));
    getActivities().then((response) => setActivities(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent && selectedActivity && points > 0) {
      assignPoints(selectedStudent, { activityId: selectedActivity, points }).then(() => {
        alert('Points assigned successfully');
        setSelectedStudent('');
        setSelectedActivity('');
        setPoints(0);
      });
    } else {
      alert('Please fill in all fields');
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
            {activity.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        required
      />

      <button type="submit">Assign Points</button>
    </form>
  );
};

export default AssignActivity;
