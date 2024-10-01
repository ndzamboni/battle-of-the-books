import React, { useState } from 'react';
import { deleteStudent, removeActivityFromStudent } from '../api'; // Import API calls
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMedal, faFire, faTrophy } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import './Bookshelf.css';

const Bookshelf = ({ students, setStudents, activities }) => {
  const [selectedStudent, setSelectedStudent] = useState(null); // Modal state

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

  // Helper function to render badges as icons
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

          {/* Button to trigger modal */}
          <button onClick={() => setSelectedStudent(student)}>Show Activities</button>

          <button onClick={() => handleDelete(student._id)}>Delete Student</button>
        </div>
      ))}

      {/* Modal for displaying activities */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`${selectedStudent.name}'s Activities`}
        >
          <ul>
            {selectedStudent.completedActivities.map((activity, index) => {
              const activityName = activities?.find((act) => act._id === activity.activityId)?.name || "Unknown Activity";
              return (
                <li key={index}>
                  {activityName}, Points Earned: {activity.pointsEarned}
                  <button onClick={() => handleRemoveActivity(selectedStudent._id, activity.activityId)}>
                    Remove Activity
                  </button>
                </li>
              );
            })}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Bookshelf;
