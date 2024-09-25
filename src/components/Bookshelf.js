import React from 'react';
import { deleteStudent } from '../api';
import './Bookshelf.css';

const Bookshelf = ({ students, setStudents }) => {
  const handleDelete = (id) => {
    deleteStudent(id).then(() => {
      setStudents(students.filter((student) => student._id !== id));
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
          <p>Badges: 
            {student.badges.length > 0
              ? student.badges.map((badge, index) => <span key={index}>{badge}, </span>)
              : 'No Badges'}
          </p>
          <button onClick={() => handleDelete(student._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Bookshelf;
