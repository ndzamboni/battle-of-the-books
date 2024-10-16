import React, { useState } from 'react';
import { deleteStudent, removeActivityFromStudent } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMedal, faFire, faTrophy } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import './Bookshelf.css';

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
  if (!badges || badges.length === 0) return <span>No Badges</span>; // Use span instead of p

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


const Bookshelf = ({ students, setStudents, activities }) => {
  const [selectedStudent, setSelectedStudent] = useState(null); // Modal state

  const handleDelete = (id) => {
    if (!id) {
      console.error('Student ID is missing');
      return;
    }
    deleteStudent(id).then(() => {
      setStudents(students.filter((student) => student._id !== id));
    }).catch(error => {
      console.error('Error deleting student:', error);
    });
  };


  const handleRemoveActivity = (studentId, activityId) => {
    if (!studentId || !activityId) {
      console.error('Student ID or Activity ID is missing');
      return;
    }
    removeActivityFromStudent(studentId, activityId).then((updatedStudent) => {
      setStudents(students.map(student => student._id === updatedStudent.data._id ? updatedStudent.data : student));
    }).catch(error => {
      console.error('Error removing activity:', error);
    });
  };

  return (
    <div className="bookshelf">
      {students && students.length > 0 ? (
        students.map((student) => (
          <div
            className="book card"
            key={student._id}
            style={{ backgroundColor: student.color || '#ffdd57' }}
          >
            <img src={student.avatar} alt={`${student.name}'s avatar`} />
            <h3>{student.name}</h3>
            <p>Points: {student.totalPoints}</p>
            <p>Badges: {renderBadges(student.badges)}</p>

            {/* Button to trigger modal */}
            <button onClick={() => setSelectedStudent(student)}>Show Activities</button>

            <button onClick={() => handleDelete(student._id)}>Delete Student</button>
          </div>
        ))
      ) : (
        <p>No students available.</p>
      )}

      {/* Modal for displaying activities */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`${selectedStudent.name}'s Activities`}
        >
          <ul>
            {selectedStudent.completedActivities && selectedStudent.completedActivities.length > 0 ? (
              selectedStudent.completedActivities.map((activity, index) => {
                const activityName = activities?.find((act) => act._id === activity.activityId)?.name || "Unknown Activity";
                return (
                  <li key={index}>
                    {activityName}, Points Earned: {activity.pointsEarned}
                    <button onClick={() => handleRemoveActivity(selectedStudent._id, activity.activityId)}>
                      Remove Activity
                    </button>
                  </li>
                );
              })
            ) : (
              <p>No activities completed yet.</p>
            )}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Bookshelf;
