// Corrected Groups.js
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GroupModal } from '../components/Groupcreate.js';
import { Link } from 'react-router-dom';
import './Group.css';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [mygroups, setMyGroups] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const username = sessionStorage.getItem('username');
  // Function to fetch all groups
  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:3001/groups'); //
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error.response ? error.response.data : error.message);
    }
    try {
      const response = await axios.get(`http://localhost:3001/groups/user/${username}`);
      setMyGroups(response.data);
    }
    catch (error) {
      console.error('Error fetching My Groups:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    // Fetch groups when the component mounts
    fetchGroups();
  }, []);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  let admin = true;

  const handleModalSubmit = async ({ group_name, group_description }) => {
    try {
      const groupResponse = await axios.post('http://localhost:3001/groups', {
        group_name,
        group_description,
      });
      await axios.post('http://localhost:3001/users_groups', {
        username,
        group_name,
        admin,
      });
    }
    catch (error) {
      console.error('Error during group creation:', error.response ? error.response.data : error.message);
    }

    // Close the modal
    setModalIsOpen(false);
  };

  return (
    <div>
      <Container>
        <GroupModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          onSubmit={handleModalSubmit}
        />
        <Row>
          <Col md={6}>
          <h1>All Groups</h1>
            <div
              className="group-container"
              style={{ height: '400px', overflowY: 'auto', border: '5px solid #ddd', padding: '10px' }}
            >
              {groups.map((group) => (
                <div key={group.group_name} className="mb-3">
                  <div className="group-box p-3 border" style={{ backgroundColor: 'lightblue' }}>
                    <h3>{group.group_name}</h3>
                    <p style={{ maxHeight: '80px', overflow: 'hidden' }}>{group.group_description}</p>
                    {/* Add more details or actions as needed */}
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col md={6}>
          <h1>Your Groups</h1>
            {/* My Groups */}
            <div
              className="group-container"
              style={{ height: '400px', overflowY: 'auto', border: '5px solid #ddd', padding: '10px' }}
            >
              {mygroups.map((group, index) => (
                <Link
                  to={`/groups/${group.group_name}`}
                  key={group.group_name}
                  className={`mb-3 ${index !== mygroups.length - 1 ? 'mb-5' : ''}`}  // Add additional margin for all but the last box
                  style={{ textDecoration: 'none', color: 'black', display: 'block' }}
                >
                  <div className="group-box p-3 border" style={{ backgroundColor: 'lightblue' }}>
                    <h3>{group.group_name}</h3>
                    <p style={{ maxHeight: '80px', overflow: 'hidden' }}>{group.group_description}</p>
                    {/* Add more details or actions as needed */}
                  </div>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
        <Row className="mt-4"> {/* Add top margin and a new row for the button */}
        <Col md={12}>
          <button
            onClick={handleOpenModal}
            className="btn btn-primary"
            style={{
              backgroundColor: 'green',
              borderColor: 'green',
            }}
          >
            Add group
          </button>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default Groups;
