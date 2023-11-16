import React, { useState } from 'react';
import axios from 'axios';
import { jwtToken, usernameSignal } from './Signals.js';

function Settings() {
    const username = sessionStorage.getItem('username');

    function NameForm() {
        const username = sessionStorage.getItem('username');
        const [password, setPassword] = useState('');
        const [newUsername, setNewUsername] = useState('');
        
        const handlePasswordChange = (e) => {
          setPassword(e.target.value);
        };

        const handleNewUsernameChange = (e) => {
            setNewUsername(e.target.value);
        };
        
        const handleSubmit = async (e) => {
          e.preventDefault();
            console.log('Current Username: ' + username);
            console.log('New Username: ' + newUsername);
            console.log('Password: ' + password);
          try {
            console.log('Request payload:',{username: newUsername, password});
            console.log('New Username before axios request: ' + newUsername);
            const response = await axios.put(`http://localhost:3001/users/name/${username}`, {
                newUsername,
                password,
                username,
              });

          jwtToken.value = response.data.jwtToken;
          usernameSignal.value = newUsername;
        }
        catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        // Handle the error, e.g., display an error message to the user
      }
    };
    return ( 
        <div className="container">
  <div className='centeringContainer'>
  </div>

  <div className="row">
    <div className="col-md-6 offset-md-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="newUsername" className="form-label">
            Your new username:
          </label>
          <input
                type="text"
                id="newUsername"
                className="form-control"
                value={newUsername}
                onChange={handleNewUsernameChange}
              />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Change name
        </button>

      </form>

    </div>
  </div>
</div>
    )
}
    const handleDeleteUser = async () => {

        const confirmDelete = window.confirm("Are you sure you want to delete your user? This action is irreversible.");

        if (!confirmDelete) {
            return;
        }
        
        try {
            const response = await axios.delete(`http://localhost:3001/users/${username}`, {
                headers: { Authorization: `Bearer ${jwtToken.value}` },
            });
            console.log('User deleted:', response.data);

            sessionStorage.removeItem('username');
            jwtToken.value = '';
            usernameSignal.value = '';

            window.location.href = '/login'; 

        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>Settings</h1>
            <p>Username: {username}</p>
            <NameForm />
            <button onClick={handleDeleteUser}>Delete User</button>
        </div>
    );
}


export default Settings