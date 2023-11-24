import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'; // Import the CSS file
import ThemeSwitcher from './ThemeSwitcher';
import { Routes, Route } from 'react-router-dom';

import Login from '../assets/Login';
import Signup from '../assets/Signup';
import Home from '../assets/Home';
import Userlist from '../assets/Userlist';
import { jwtToken, usernameSignal } from '../assets/Signals';

const Header = ({ loggedIn }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve the theme preference from local storage or any other source
    const storedTheme = localStorage.getItem('darkMode') === 'enabled';
    setIsDarkMode(storedTheme);
    // Update the body class based on the initial theme
    updateBodyClass(storedTheme);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save the theme preference to local storage or any other source
      localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
      // Update the body class based on the new theme
      updateBodyClass(newMode);
      return newMode;
    });
  };

  const updateBodyClass = (isDarkMode) => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  };

  const username = sessionStorage.getItem('username');
  console.log(username);

  const handleLogout = () => {
    // Clear authentication-related information
    jwtToken.value = ''; // Assuming jwtToken is a ref or a mutable object
    usernameSignal.value = '';
    window.location.href = '/login';
    sessionStorage.clear();
  };

  return (
    <header>
      <Navbar expand="lg" className={`bg-body-tertiary ${isDarkMode ? 'dark-mode' : ''}`}>
        <Container>
          <Navbar.Brand href="/">MovieSite</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="custom-nav">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/reviews">Reviews</Nav.Link>
              <Nav.Link href="/groups">Groups</Nav.Link>
              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <ThemeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
