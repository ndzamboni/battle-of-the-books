import React, { useEffect, useState } from 'react';
import { getStudents } from '../api';
import './Leaderboard.css';  // Import leaderboard styles

const Leaderboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then((response) => {
      const sortedStudents = response.data.sort((a, b) => b.totalPoints - a.totalPoints);
      setStudents(sortedStudents);
    });
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.totalPoints} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
