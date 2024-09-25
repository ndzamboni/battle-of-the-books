import React from 'react';
import { deleteActivity } from '../api';

const ActivityList = ({ activities, setActivities }) => {
  const handleDelete = (id) => {
    deleteActivity(id).then(() => {
      setActivities(activities.filter((activity) => activity._id !== id));
    });
  };

  return (
    <div className="activity-list">
      <h2>Activity List</h2>
      <ul>
        {activities.map((activity) => (
          <li className="activity-card card" key={activity._id}>
            <div>
              <h3>{activity.name}</h3>
              <p>{activity.points} points</p>
            </div>
            <button onClick={() => handleDelete(activity._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
