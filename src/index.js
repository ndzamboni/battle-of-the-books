import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import './App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Updated for React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
