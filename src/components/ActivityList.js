import React, { useEffect, useState } from 'react';
import { getActivities, deleteActivity } from '../api';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities().then((response) => setActivities(response.data));
  }, []);

  const handleDelete = (id) => {
    deleteActivity(id).then(() => {
      setActivities(activities.filter((activity) => activity._id !== id));
    });
  };

  return (
    <div>
      <h2>Activity List</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {activity.name} - {activity.points} points
            <button onClick={() => handleDelete(activity._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
