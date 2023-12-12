import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import './Signup.css'
import baseUrl from '../components/baseUrl';

//In Signup you can create a new account

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('All fields are required.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      setLoading(false);
      return;
    }
    const avatar = 'default';

    //Sending username, password and avatar to the server
    //avatar is  set as default for everyone, but can be changed in Profile
    try {
      const response = await axios.post(`${baseUrl}/users/register`, {
        username,
        password,
        avatar,
      });

      console.log('Register successful:', response.data);
      setSuccessMessage('Account created successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error while registering:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data.error);
        setSuccessMessage('');
      } else {
        console.error('Error during registration:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="centeringContainer">
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

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                'Register'
              )}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </form>
          <Link to="/login" variant="body2">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;