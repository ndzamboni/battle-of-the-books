import React from 'react';

const Leaderboard = ({ students }) => {
  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {students
          .sort((a, b) => b.totalPoints - a.totalPoints) // Sort by points
          .map((student) => (
            <li
              key={student._id}
              style={{ backgroundColor: student.color }}  // Apply student's color
            >
              {student.name} - {student.totalPoints} points
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
