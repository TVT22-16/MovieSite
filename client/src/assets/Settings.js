import React from 'react';
import axios from 'axios';
import { jwtToken, usernameSignal } from './Signals.js';

function Settings() {
  const username = sessionStorage.getItem('username');

  const handleDeleteUser = async () => {
    try {
      // Make an Axios DELETE request to the server
      const response = await axios.delete(`http://localhost:3001/users/${username}`, {
        headers: { Authorization: `Bearer ${jwtToken.value}` },
      });

      // Handle success, e.g., show a success message or update the UI
      console.log('User deleted:', response.data);

      // Clear session storage and update signals on successful delete
      sessionStorage.removeItem('username');
      jwtToken.value = '';
      usernameSignal.value = '';

      // Redirect to the login page or handle the UI accordingly
      // For example, you can use React Router to navigate to another page
      // history.push('/login');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <p>Username: {username}</p>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
}


export default Settings