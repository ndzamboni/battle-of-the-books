import React from 'react';

const Leaderboard = ({ students }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {students
          .sort((a, b) => b.totalPoints - a.totalPoints)
          .map((student) => (
            <li
              key={student._id}
              className="card"
              style={{ backgroundColor: student.color || '#ffdd57' }}  // Apply student color, fallback to yellow if missing
            >
              <h3>{student.name}</h3>
              <p>{student.totalPoints} points</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
