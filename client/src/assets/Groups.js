import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GroupModal } from '../components/Groupcreate.js';
import { Link } from 'react-router-dom';
import './Group.css';

//Here you can see all groups and groups you are a member of
//You can also create a new group

function Groups() {
  const [groups, setGroups] = useState([]);
  const [mygroups, setMyGroups] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [disabledJoinButtons, setDisabledJoinButtons] = useState([]);

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

  const fetchJoinRequestsForGroup = async (groupName) => {
    try {
      const response = await axios.get(`http://localhost:3001/joinrequest/pending-join-requests/${groupName}/${username}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching join requests:', error.response ? error.response.data : error.message);
      return [];
    }
  };

  const updateDisabledJoinButtons = async () => {
    const disabledButtons = [];

    // Iterate over groups
    for (const group of groups) {
      // Check if the user is a member of the group
      const isMember = mygroups.some((myGroup) => myGroup.group_name === group.group_name);

      // Check if there are pending join requests
      const pendingJoinRequests = await fetchJoinRequestsForGroup(group.group_name);

      // If the user is a member or there are pending join requests, disable the button
      if (isMember || pendingJoinRequests.length > 0) {
        disabledButtons.push(group.group_name);
      }
    }

    // Update the state to reflect disabled buttons
    setDisabledJoinButtons(disabledButtons);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchGroups();
      updateDisabledJoinButtons();
    };

    fetchData();
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

  const handleJoinRequest = async (group_name) => {
    const isLoggedIn = sessionStorage.getItem('username');
    if (!isLoggedIn) {
      alert('You must be logged in to join a group.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/joinrequest/add', {
        senderUsername: username,
        groupName: group_name,
        status: 'pending',
      });
      alert('Join request sent successfully!');
      setDisabledJoinButtons((prevButtons) => [...prevButtons, group_name]);
    } catch (error) {
      console.error('Error sending join request:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
  <Container>
    <GroupModal isOpen={modalIsOpen} onRequestClose={handleCloseModal} onSubmit={handleModalSubmit} />
    <Row>
      <Col md={6}>
      <h1>All Groups</h1>
        <div className="group-container" style={{ height: '400px', overflowY: 'auto', border: '5px solid #ddd', padding: '10px' }}>
          {groups.map((group) => (
            <div key={group.group_name} className="mb-3">
              <div className="group-box p-3 border" style={{ backgroundColor: 'lightblue' }}>
                <h3>{group.group_name}</h3>
                <p style={{ maxHeight: '80px', overflow: 'hidden' }}>{group.group_description}</p>
                <Button
                  variant="primary"
                  onClick={() => handleJoinRequest(group.group_name)}
                  disabled={disabledJoinButtons.includes(group.group_name)}
                  style={{ visibility: mygroups.some((myGroup) => myGroup.group_name === group.group_name) ? 'hidden' : 'visible' }}
                >
                  Join Group
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Col>
      <Col md={6}>
        <h1>Your Groups</h1>
        {/* My Groups */}
        <div className="group-container" style={{ height: '400px', overflowY: 'auto', border: '5px solid #ddd', padding: '10px' }}>
          {mygroups.map((group, index) => (
            <Link
              to={`/groups/${group.group_name}`}
              key={group.group_name}
              className={`mb-3 ${index !== mygroups.length - 1 ? 'mb-5' : ''}`}
              style={{ textDecoration: 'none', color: 'black', display: 'block' }}
            >
              <div className="group-box p-3 border" style={{ backgroundColor: 'lightblue' }}>
                <h3>{group.group_name}</h3>
                <p style={{ maxHeight: '80px', overflow: 'hidden' }}>{group.group_description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Col>
    </Row>
    <Row className="mt-4">
      {/* Add top margin and a new row for the button */}
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
