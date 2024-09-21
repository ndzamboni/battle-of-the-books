import React from 'react';
import Bookshelf from './components/Bookshelf';
import Leaderboard from './components/Leaderboard';
import AddStudent from './components/AddStudent';
import AddActivity from './components/AddActivity';
import ActivityList from './components/ActivityList';
import AssignActivity from './components/AssignActivity';  // New import
import './App.css';  // Global styles

function App() {
  return (
    <div className="app-container">
      <h1>Battle of the Books</h1>
      <AddStudent />
      <Bookshelf />
      <AddActivity />
      <ActivityList />
      <AssignActivity />  {/* New Assign Activity component */}
      <Leaderboard />
    </div>
  );
}

export default App;
