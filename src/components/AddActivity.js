import React, { useState } from 'react';
import { addActivity } from '../api';

const AddActivity = ({ activities, setActivities }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addActivity({ name, description, points }).then((response) => {
      setName('');
      setDescription('');
      setPoints(0);
      // Add the new activity to the activities list
      setActivities([...activities, response.data]);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Activity Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
