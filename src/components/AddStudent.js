import React, { useState } from 'react';
import { addStudent } from '../api';

const generateRandomColor = () => {
  // Generate a random hex color
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const AddStudent = ({ students, setStudents }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const color = generateRandomColor();  // Assign a random color to the student
    addStudent({ name, avatar, color }).then((response) => {
      setName('');
      setAvatar('');
      setStudents([...students, response.data]);  // Update the student list with color
    });
  };

  return (
    <div>
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
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
