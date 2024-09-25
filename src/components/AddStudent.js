import React, { useState } from 'react';
import { addStudent } from '../api';

const AddStudent = ({ students, setStudents }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [color, setColor] = useState('#ff0000'); // Default color

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the color, name, and avatar are correctly passed
    addStudent({ name, avatar, color }).then((response) => {
      setName('');
      setAvatar('');
      setColor('#ff0000'); // Reset color picker after submission
      setStudents([...students, response.data]);  // Update student list with the new student
    });
  };

  return (
    <div className="add-student-form card">
      <h2>Add a New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <label>Pick a Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}  // Color picker input
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
