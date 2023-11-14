import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';
import { Routes, Route } from 'react-router-dom';
import Login from '../assets/Login';
import Signup from '../assets/Signup';
import Home from '../assets/Home';
import { jwtToken, usernameSignal } from '../assets/Signals';
//import Signup from '../assets/Signup';



const Header = ({loggedIn}) => {
  
  const username = usernameSignal.value;

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
        {jwtToken.value.length > 0 ? (
        <NavDropdown title={username} id="basic-nav-dropdown">
          <NavDropdown.Item href="/reviews">Reviews</NavDropdown.Item>
          <NavDropdown.Item href="/mygroups">Groups</NavDropdown.Item>
          <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>  
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        ) : (
          <div></div>
        )}
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

export default Header