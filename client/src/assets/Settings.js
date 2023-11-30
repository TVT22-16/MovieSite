import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtToken, usernameSignal } from './Signals.js';
import './Login.css';
import IMAGES from './avatars/Images.js';
import { Container, Row, Col } from 'react-bootstrap';



function Settings() {
    const username = sessionStorage.getItem('username');

    function NameForm() {
        const username = sessionStorage.getItem('username');
        const [password, setPassword] = useState('');
        const [newUsername, setNewUsername] = useState('');

        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        };

        const handleNewUsernameChange = (e) => {
            setNewUsername(e.target.value);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('Current Username: ' + username);
            console.log('New Username: ' + newUsername);
            console.log('Password: ' + password);
            try {
                console.log('Request payload:', { username: newUsername, password });
                console.log('New Username before axios request: ' + newUsername);
                const response = await axios.put(`http://localhost:3001/users/name/${username}`, {
                    newUsername,
                    password,
                    username,
                });

                jwtToken.value = response.data.jwtToken;
                usernameSignal.value = newUsername;
            }
            catch (error) {
                console.error('Error during login:', error.response ? error.response.data : error.message);
                // Handle the error, e.g., display an error message to the user
            }
        };
        const handleDeleteUser = async () => {

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
        };
        return (
            <div className="container">
                <div className='centeringContainer'>
                </div>

                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="newUsername" className="form-label">
                                    Your new username:
                                </label>
                                <input
                                    type="text"
                                    id="newUsername"
                                    className="form-control"
                                    value={newUsername}
                                    onChange={handleNewUsernameChange}
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
                            <button type="submit" className="btn btn-primary">
                                Change name
                            </button>
                            <br></br>
                            <br></br>
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
                        </form>

                    </div>
                </div>
            </div>
        )
    }
    const ClickableBoxes = ({ handleBoxClick }) => {
        // Sample data for the boxes
        const boxesData = [
            { id: 1, text: 'Default avatar', avatar: 'default' },
            { id: 2, text: 'Car', avatar: 'car' },
            { id: 3, text: 'Landscape', avatar: 'landscape' },
            { id: 4, text: 'Space', avatar: 'space' },
            {id: 5, text: 'Gorilla', avatar: 'gorilla'}
            // Add more boxes as needed
        ];

        // Function to handle box click
        const handleClick = (box) => {
            // Call the handleBoxClick function with the selected box
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
                avatar: box.avatar, // Assuming IMAGES is an object with avatar URLs
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
            <NameForm />
            <ClickableBoxes handleBoxClick={handleBoxClickFunction} />
        </div>
    );
}

export default Settings