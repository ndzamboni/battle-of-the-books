import React, { useState, useEffect } from 'react';
import { addStudent, getStudents } from '../api';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then((response) => setStudents(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({ name, avatar }).then(() => {
      setName('');
      setAvatar('');
      // Fetch updated student list
      getStudents().then((response) => setStudents(response.data));
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

      <h3>Current Students:</h3>
      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddStudent;
