import React, { useState, useEffect } from 'react';
import Bookshelf from './components/Bookshelf';
import Leaderboard from './components/Leaderboard';
import AddStudent from './components/AddStudent';
import AddActivity from './components/AddActivity';
import AssignActivity from './components/AssignActivity';
import ActivityList from './components/ActivityList'; // Import ActivityList for modal
import Modal from './components/Modal';  // Import Modal component
import { getStudents, getActivities } from './api';
import './App.css';  // Global styles

function App() {
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);  // Toggle state
  const [showManageActivities, setShowManageActivities] = useState(false); // State for managing activities

  useEffect(() => {
    getStudents().then((response) => setStudents(response.data));
    getActivities().then((response) => setActivities(response.data));
  }, []);

  return (
    <div className="app-container">
      {/* Include the link to the Gravatar URL generator at the top */}
      <header style={{ marginBottom: '20px' }}>
        <p>
          Need an avatar? Generate one <a href="https://vinicius73.github.io/gravatar-url-generator/#/" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      </header>

      <h1>Battle of the Books</h1>

      {/* Button to toggle between leaderboard and student/activity inputs */}
      <button
        onClick={() => setShowLeaderboard(!showLeaderboard)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        {showLeaderboard ? 'Go to Student/Activity Input' : 'Go to Leaderboard'}
      </button>

      {/* Button to trigger Manage Activities Modal */}
      <button
        onClick={() => setShowManageActivities(true)} // Show the modal when clicked
        style={{
          padding: '10px 20px',
          backgroundColor: '#FF5733',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Manage Activities
      </button>

      {/* Conditionally render based on the toggle */}
      {!showLeaderboard ? (
        <>
          <AddStudent students={students} setStudents={setStudents} />
          <Bookshelf students={students} setStudents={setStudents} />
          <AddActivity activities={activities} setActivities={setActivities} />
          <AssignActivity students={students} activities={activities} setStudents={setStudents} />
        </>
      ) : (
        <Leaderboard students={students} />
      )}

      {/* Modal for managing activities */}
      {showManageActivities && (
        <Modal
          title="Manage Activities"
          isOpen={showManageActivities}
          onClose={() => setShowManageActivities(false)}  // Close modal
        >
          <ActivityList activities={activities} setActivities={setActivities} />
        </Modal>
      )}
    </div>
  );
}

export default App;
