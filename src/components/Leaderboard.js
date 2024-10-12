import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMedal, faFire, faTrophy } from '@fortawesome/free-solid-svg-icons';

// Create a mapping between badge names and icons
const badgeIconMapping = {
  "100 Points Badge": { icon: faStar, color: 'gold' },
  "500 Points Badge": { icon: faStar, color: 'gold' },
  "1,000 Points Badge": { icon: faStar, color: 'gold' },
  "2,000 Points Badge": { icon: faStar, color: 'gold' },
  "10 Activities Badge": { icon: faMedal, color: 'silver' },
  "50 Activities Badge": { icon: faMedal, color: 'silver' },
  "100 Activities Badge": { icon: faMedal, color: 'silver' },
  "3-Day Streak Badge": { icon: faFire, color: 'orange' },
  "Week Streak Badge": { icon: faFire, color: 'orange' },
  "1,000 Points Badge": { icon: faTrophy, color: 'blue' },
  "50 Activities Badge": { icon: faTrophy, color: 'blue' },
};

// Helper function to render badges using the mapping
const renderBadges = (badges) => {
  if (!badges || badges.length === 0) return <p>No Badges</p>;

  return badges.map((badge, index) => {
    const badgeDetails = badgeIconMapping[badge];
    if (!badgeDetails) return null;

    return (
      <FontAwesomeIcon
        key={index}
        icon={badgeDetails.icon}
        title={badge}
        style={{ color: badgeDetails.color, marginRight: '8px' }}
      />
    );
  });
};

const Leaderboard = ({ students }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {students
          .sort((a, b) => b.totalPoints - a.totalPoints)
          .map((student, index) => (
            <li
              key={student._id}
              className="card"
              style={{ backgroundColor: student.color || '#ffdd57' }}
            >
              <h3>
                {index + 1}. {student.name} {/* Display ranking numerically */}
              </h3>
              <img
                src={student.avatar}
                alt={`${student.name}'s avatar`}
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '10px' }}
              />
              <p>{student.totalPoints} points</p>
              <p>Badges: {renderBadges(student.badges)}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
