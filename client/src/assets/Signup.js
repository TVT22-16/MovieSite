import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css'

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add your authentication logic and check the username and password.
    // For this example, we'll just log them to the console.
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (

    <div className="container">
      <div className='centeringContainer'>
        <h1>Create an account</h1>
      </div>
      
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={handleUsernameChange}
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
              Register
            </button>
          </form>
          <Link to="/login" variant="body2">Already have an account? Login here</Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;
