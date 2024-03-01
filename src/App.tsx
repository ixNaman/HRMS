import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Login from '../src/Components/Navbar/Login';

function App() {
  // State to track login status
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <>
      {/* Conditionally render Login or Navbar and Sidebar based on login status */}
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <Navbar />
          <Sidebar />
        </div>
      )}
    </>
  );
}

export default App;
