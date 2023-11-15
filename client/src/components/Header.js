import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';
import { Routes, Route } from 'react-router-dom';

import { jwtToken, usernameSignal } from '../assets/Signals';
import Login from '../assets/Login';
import Signup from '../assets/Signup';
import Home from '../assets/Home';
import { jwtToken, usernameSignal, handleLogout } from '../assets/Signals';




const Header = ({loggedIn}) => {
  
  const username = usernameSignal.value;

  const handleLogout = () => {
    // Clear authentication-related information
    jwtToken.value = ''; // Assuming jwtToken is a ref or a mutable object
    usernameSignal.value = '';
    // Add other logout-related logic if needed
  };
  if (jwtToken.value.length > 0) {
  return <header>
   
    <Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand href="/">MovieSite</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="custom-nav">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/reviews">Reviews</Nav.Link>
        <Nav.Link href="/mygroups">Groups</Nav.Link>
        <NavDropdown title={username} id="basic-nav-dropdown">
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>  
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  </header>

<Routes>
      <Route path="/"  />
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup/>}/>
      </Routes>
</header>

  
} else {  
return <header>
   
  <Navbar expand="lg" className="bg-body-tertiary">
<Container>
  <Navbar.Brand href="/">MovieSite</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="custom-nav">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/login">Log in</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>
<Routes>
    <Route path="/"  />
    <Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Signup/>}/>
    </Routes>
</header>
}
}

export default Header