import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtToken, usernameSignal } from './Signals.js';
import './Login.css';
import IMAGES from './avatars/Images.js';
import { Container, Row, Col } from 'react-bootstrap';
import { clientServerMatch, forceUpdateMatch } from '../components/ConfirmUserSignal.js';

//In Settings you can change your avatar and delete your user

function Settings() {
    const username = sessionStorage.getItem('username');

    // HandleDeleteUser needs confirmation from the user before deleting the user 
    const handleDeleteUser = async () => {
        if (forceUpdateMatch() === true) {

            const confirmDelete = window.confirm("Are you sure you want to delete your user? This action is irreversible.");

            if (!confirmDelete) {
                return;
            }

            try {
                const response = await axios.delete(`http://localhost:3001/users/${username}`, {
                    headers: { Authorization: `Bearer ${jwtToken.value}` },
                });
                console.log('User deleted:', response.data);

                sessionStorage.removeItem('username');
                jwtToken.value = '';
                usernameSignal.value = '';

                window.location.href = '/login';

            } catch (error) {
                console.error('Error deleting user:', error.response ? error.response.data : error.message);
            }
        }

    };

    const ClickableBoxes = ({ handleBoxClick }) => {
        const boxesData = [
            { id: 1, text: 'Default avatar', avatar: 'default' },
            { id: 2, text: 'Car', avatar: 'car' },
            { id: 3, text: 'Landscape', avatar: 'landscape' },
            { id: 4, text: 'Space', avatar: 'space' },
            { id: 5, text: 'Gorilla', avatar: 'gorilla' }
            // Add more boxes as needed
        ];

        // Function to handle box click
        const handleClick = (box) => {
            handleBoxClick(box);
        };

        return (
            <Container className="mt-3 text-center">
                <div className='centeringContainer'>
                    <h2 className="mb-3">Change profile picture</h2>
                    <Row className="justify-content-center">
                        {boxesData.map((box) => (
                            <Col key={box.id} xs={5} md={2}>
                                <div
                                    onClick={() => handleClick(box)}
                                    className="btn btn-primary"
                                    style={{
                                        backgroundColor: 'green',
                                        borderColor: 'green',
                                        margin: '5px',
                                        width: '125px', cursor: 'pointer'
                                    }}
                                >
                                    {box.text}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        );
    }
    const handleBoxClickFunction = async (box) => {
        console.log(`Box ${box.id} clicked!`);
        try {
            const username = sessionStorage.getItem('username');

            await axios.put(`http://localhost:3001/users/avatar/${username}`, {
                avatar: box.avatar,
                username: username,
            });
            window.location.reload();
        } catch (error) {
            console.error('Error updating avatar:', error.response ? error.response.data : error.message);
            // Handle the error, e.g., display an error message to the user
        }
    };
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            // Filter the users to include only the current user
            const currentUser = response.data.find((user) => user.username === username);
            if (currentUser) {
                if (currentUser.avatar) {
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
        fetchUsers();
    }, [username])

    return (
        <div>
            {forceUpdateMatch() === true ? (<div>

                <h1>Settings</h1>
                <div>
                    <div className='centeringContainer'>
                        {users.map((user, index) => {
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

                </div>
                <ClickableBoxes handleBoxClick={handleBoxClickFunction} />


            </div>) : (<div>Unauthorized</div>)}
                        <br></br>
                        <br></br>
            <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <button
                                onClick={handleDeleteUser}
                                className="btn btn-primary"
                                style={{
                                    backgroundColor: 'red',
                                    borderColor: 'red',
                                }}
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
        </div>
    );
}

export default Settings