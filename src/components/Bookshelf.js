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
          className="book"
          key={student._id}
          style={{ backgroundColor: student.color }} // Apply student's color
        >
          <img src={student.avatar} alt={`${student.name}'s avatar`} />
          <h3>{student.name}</h3>
          <p>Points: {student.totalPoints}</p>
          <p>Badges: {student.badges.length}</p>
          <button onClick={() => handleDelete(student._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Bookshelf;
