import React, { useState } from 'react';
import { addStudent } from '../api';

const AddStudent = ({ students, setStudents }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [color, setColor] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addStudent({ name, avatar, color });
      
      // Check if the response and data are not null or undefined
      if (response && response.data) {
        setStudents([...students, response.data]);
        setName('');
        setAvatar('');
        setColor('');
      } else {
        console.error('Unexpected response:', response);
        alert('There was an error adding the student. Please try again.');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      alert('An error occurred. Please check your input and try again.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Add Student</h3>
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
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudent;
