import React, { useState, useEffect } from 'react';
import Bookshelf from './components/Bookshelf';
import Leaderboard from './components/Leaderboard';
import AddStudent from './components/AddStudent';
import AddActivity from './components/AddActivity';
import AssignActivity from './components/AssignActivity';
import ActivityList from './components/ActivityList'; // Import ActivityList for modal
import Modal from './components/Modal';  // Import Modal component
import { getStudents, getActivities } from './api';  // Import your MongoDB API functions
import './App.css';  // Global styles

function App() {
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);  // Toggle state
  const [showManageActivities, setShowManageActivities] = useState(false); // State for managing activities

  // Fetch students from MongoDB backend
  const fetchStudents = async () => {
    try {
      const studentsData = await getStudents();
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch activities from MongoDB backend
  const fetchActivities = async () => {
    try {
      const activitiesData = await getActivities();
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchActivities();
  }, []);

  return (
    <div className="app-container">
      {/* Include the link to the Gravatar URL generator at the top */}
      <header style={{ marginBottom: '20px' }}>
        <p>
          Need an avatar? Generate one{' '}
          <a
            href="https://vinicius73.github.io/gravatar-url-generator/#/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
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
          <div className="form-container">
            <AddStudent students={students} setStudents={setStudents} />
          </div>
          <Bookshelf students={students} setStudents={setStudents} />
          <div className="form-container">
            <AddActivity activities={activities} setActivities={setActivities} />
          </div>
          <div className="form-container">
            <AssignActivity students={students} activities={activities} setStudents={setStudents} />
          </div>
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
