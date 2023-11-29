import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IMAGES from './avatars/Images.js';

function Profile() {
    const [users, setUsers] = useState([]);
    const [mygroups, setMyGroups] = useState([]);

    const username = sessionStorage.getItem('username');
    // Function to fetch all groups
    const fetchGroups = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/groups/user/${username}`);
            setMyGroups(response.data);
        }
        catch (error) {
            console.error('Error fetching My Groups:', error.response ? error.response.data : error.message);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            // Filter the users to include only the current user
            const currentUser = response.data.find((user) => user.username === username);
            if (currentUser) {
                if (currentUser.avatar) {
                    console.log('User Avatar:', currentUser.avatar); // Log user's avatar if it's defined
                } else {
                    console.log('User has no avatar.'); // Log a message if the avatar is not defined
                }
                setUsers([currentUser]);
            }
        } catch (error) {
            console.error('Error fetching users:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        // Fetch groups when the component mounts
        fetchGroups();
    }, []);

    useEffect(() => {
        // Fetch groups when the component mounts
        fetchUsers();
    }, [username]);

    return (
        <div>
            <Container>
            <div>
                {users.map((user, index) => {
                    console.log('User Avatar:', user.avatar); // Log user's avatar for debugging
                    return (
                        <li key={index} style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}>
                            {user.avatar && (
                                <img
                                    src={IMAGES[user.avatar]}
                                    alt={`Avatar for ${user.username} with [${user.avatar}]`}
                                    style={{ width: '50px', height: '50px', marginLeft: '10px' }}
                                />
                            )}
                            <h2 style={{ fontSize: '40px' }}>{user.username}</h2>
                        </li>
                    );
                })}
            </div>
                <Row>
                    <Col md={6}>
                        {/* My Groups */}
                        <div className="group-container" style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
                            {mygroups.map((group) => (
                                <Link to={`/groups/${group.group_name}`} key={group.group_name} className="mb-3" style={{ textDecoration: 'none', color: 'black' }}>
                                    <div className="group-box p-3 border">
                                        <h3>{group.group_name}</h3>
                                        <p style={{ maxHeight: '80px', overflow: 'hidden' }}>{group.group_description}</p>
                                        {/* Add more details or actions as needed */}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile