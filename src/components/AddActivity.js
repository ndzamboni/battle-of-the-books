import React, { useState } from 'react';
import { addActivity } from '../api';

const AddActivity = ({ activities, setActivities }) => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addActivity({ name, points });

      // Check if the response and data are not null or undefined
      if (response && response.data) {
        setActivities([...activities, response.data]);
        setName('');
        setPoints('');
      } else {
        console.error('Unexpected response:', response);
        alert('There was an error adding the activity. Please try again.');
      }
    } catch (error) {
      console.error('Error adding activity:', error);
      alert('An error occurred. Please check your input and try again.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Add Activity</h3>
      <input
        type="text"
        placeholder="Activity Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        required
      />
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default AddActivity;
