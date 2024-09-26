import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMedal, faFire, faTrophy } from '@fortawesome/free-solid-svg-icons'; // Import additional icons

const Leaderboard = ({ students }) => {
  const renderBadges = (badges) => {
    return badges.map((badge, index) => {
      if (badge.startsWith('Points Badge')) {
        return (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            title={badge}
            style={{ color: 'gold', marginRight: '8px' }}
          />
        );
      } else if (badge.startsWith('Activity Badge')) {
        return (
          <FontAwesomeIcon
            key={index}
            icon={faMedal}
            title={badge}
            style={{ color: 'silver', marginRight: '8px' }}
          />
        );
      } else if (badge.startsWith('3-Day Streak Badge') || badge.startsWith('Week Streak Badge')) {
        return (
          <FontAwesomeIcon
            key={index}
            icon={faFire}
            title={badge}
            style={{ color: 'orange', marginRight: '8px' }}
          />
        );
      } else if (badge === '1,000 Points Badge' || badge === '50 Activities Badge') {
        return (
          <FontAwesomeIcon
            key={index}
            icon={faTrophy}
            title={badge}
            style={{ color: 'blue', marginRight: '8px' }}
          />
        );
      }
      return null;
    });
  };

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
              style={{ backgroundColor: student.color || '#ffdd57' }}
            >
              <h3>{student.name}</h3>
              <p>{student.totalPoints} points</p>
              <p>Badges: {student.badges.length > 0 ? renderBadges(student.badges) : 'No Badges'}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
