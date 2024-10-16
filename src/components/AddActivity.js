import React, { useState } from 'react';
import { addActivity } from '../api';

const AddActivity = ({ activities, setActivities }) => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newActivity = await addActivity({ name, points });

      // Log the full response to see what's returned from the API
      console.log('API response:', newActivity);

      // No need to check for response.data anymore since newActivity is the object
      if (newActivity && newActivity._id) {
        setActivities([...activities, newActivity]); // Add the new activity to the state
        setName('');
        setPoints('');
      } else {
        console.error('Unexpected response:', newActivity);
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
