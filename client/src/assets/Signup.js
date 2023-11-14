import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) =>{
    setConfirmPassword(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Username: ' + username);
    console.log('Password ' + password);
    

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }
    if( password !== confirmPassword){
      setErrorMessage("Passwords don't match")
      return;
    }
   
    try {
      const response = await axios.post('http://localhost:3001/users/register', {
        username,
        password,
      });

      console.log('Register successful:', response.data);
      setSuccessMessage('Account created succesfully')
      setErrorMessage('');
      // Handle success, e.g., update state or redirect the user
      //navigate('/login');

    } catch (error) {
      console.error('Error while registering:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 409) {
        // User already exists, display an error message
        setErrorMessage(error.response.data.error);

        setSuccessMessage('');
      } else {
        // Other errors, handle them as needed
        console.error('Error during registration:', error.message);
      }
      // Handle the error, e.g., display an error message to the user
    }


  }

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

            <button type="submit" className="btn btn-primary">
              Register
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </form>
          <Link to="/login" variant="body2">Already have an account? Login here</Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;
