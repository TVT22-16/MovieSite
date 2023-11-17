import React, { useState, useEffect } from 'react';
import './Login.css'
import { jwtToken, userData, usernameSignal } from './Signals';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {

  return (
    <div>
      {jwtToken.value.length === 0 ? <LoginForm /> :
        <button onClick={() => jwtToken.value = ''}>Logout</button>}
    </div>
  );
}


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Username: ' + username);
    console.log('Password ' + password);
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setErrorMessage('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        username,
        password,
      })

      jwtToken.value = response.data.jwtToken;
      usernameSignal.value = response.data.username;

      //These may be needed later
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('token', jwtToken.value);

      console.log('Login successful:', response.data);
      setLoggedIn(true);

      // Handle success, e.g., update state or redirect the user

    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      // Handle the error, e.g., display an error message to the user
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.error);
        setSuccessMessage('');
      } else {
        console.error('Error during login:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };


  /* useEffect(() => {
    // Redirect to the homepage if logged in
    if (loggedIn) {
      // You can replace '/home' with the actual path of your homepage
      window.location.href = '/home';
    }
  }, [loggedIn]); */

  return (

    <div className="container">
      <div className='centeringContainer'>
        <h1>Enter your credentials</h1>
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                'Login'
              )}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          </form>

          <Link to="/register" variant="body2">Don't have an account? Register here</Link>
        </div>
      </div>
    </div>

  );
}

export default Login;