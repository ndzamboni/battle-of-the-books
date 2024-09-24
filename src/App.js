import React, { useState, useEffect } from 'react';
import Bookshelf from './components/Bookshelf';
import Leaderboard from './components/Leaderboard';
import AddStudent from './components/AddStudent';
import AddActivity from './components/AddActivity';
import ActivityList from './components/ActivityList';
import AssignActivity from './components/AssignActivity'; 
import { getStudents, getActivities } from './api';
import './App.css';  // Global styles

function App() {
  const [students, setStudents] = useState([]); // Centralized state for students
  const [activities, setActivities] = useState([]); // Centralized state for activities

  useEffect(() => {
    // Fetch students and activities when the app loads
    getStudents().then((response) => setStudents(response.data));
    getActivities().then((response) => setActivities(response.data));
  }, []);

  return (
    <div className="app-container">
      <h1>Battle of the Books</h1>
      <AddStudent students={students} setStudents={setStudents} />
      <Bookshelf students={students} setStudents={setStudents} />

      <AddActivity activities={activities} setActivities={setActivities} />
      <ActivityList activities={activities} setActivities={setActivities} />  {/* Pass activities and setActivities */}
      
      <AssignActivity students={students} activities={activities} />

      <Leaderboard students={students} /> {/* Leaderboard now receives students prop */}
    </div>
  );
}

export default App;
