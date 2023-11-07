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
//import Signup from '../assets/Signup';



const Header = () => {
  
  return <header>
   
    


    <Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand href="/">MovieSite</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="custom-nav">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/signin">Sign In</Nav.Link>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Item href="/mygroups">Groups</NavDropdown.Item>  
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Routes>
      <Route path="/"  />
      <Route path="/home" element={<Home/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>

  </header>
  
 
}

export default Header