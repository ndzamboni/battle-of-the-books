import React, { useState } from 'react';
import { deleteStudent, removeActivityFromStudent } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMedal, faFire, faTrophy, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './Bookshelf.css';

const Bookshelf = ({ students, setStudents }) => {
  const [expandedStudent, setExpandedStudent] = useState(null);

  const handleDelete = (id) => {
    deleteStudent(id).then(() => {
      setStudents(students.filter((student) => student._id !== id));
    });
  };

  const handleRemoveActivity = (studentId, activityId) => {
    removeActivityFromStudent(studentId, activityId).then((updatedStudent) => {
      setStudents(students.map(student => student._id === updatedStudent.data._id ? updatedStudent.data : student));
    });
  };

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

  const renderActivities = (student) => {
    return (
      <div className="activities-dropdown">
        <button
          className="expand-btn"
          onClick={() => setExpandedStudent(expandedStudent === student._id ? null : student._id)}
        >
          {expandedStudent === student._id ? (
            <>
              <FontAwesomeIcon icon={faChevronUp} /> Hide Activities
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faChevronDown} /> Show Activities
            </>
          )}
        </button>

        {expandedStudent === student._id && (
          <ul className="activities-list">
            {student.completedActivities.map((activity, index) => (
              <li key={index}>
                Activity ID: {activity.activityId}, Points Earned: {activity.pointsEarned}
                <button onClick={() => handleRemoveActivity(student._id, activity.activityId)}>
                  Remove Activity
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="bookshelf">
      {students.map((student) => (
        <div
          className="book card"
          key={student._id}
          style={{ backgroundColor: student.color || '#ffdd57' }}
        >
          <img src={student.avatar} alt={`${student.name}'s avatar`} />
          <h3>{student.name}</h3>
          <p>Points: {student.totalPoints}</p>
          <p>Badges: {student.badges.length > 0 ? renderBadges(student.badges) : 'No Badges'}</p>
          {renderActivities(student)}
          <button onClick={() => handleDelete(student._id)}>Delete Student</button>
        </div>
      ))}
    </div>
  );
};

export default Bookshelf;
