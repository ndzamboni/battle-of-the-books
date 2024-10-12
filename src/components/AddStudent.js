import React, { useState } from 'react';
import { addStudent } from '../api';

const AddStudent = ({ students, setStudents }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [color, setColor] = useState('#000000'); // Default color set for color picker

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStudent = await addStudent({ name, avatar, color });

      // Log the full response to see what's returned from the API
      console.log('API response:', newStudent);

      // No need to check for response.data anymore since newStudent is the object
      if (newStudent && newStudent._id) {
        setStudents([...students, newStudent]); // Add the new student to the state
        setName('');
        setAvatar('');
        setColor('#000000'); // Reset color to default
      } else {
        console.error('Unexpected response:', newStudent);
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
