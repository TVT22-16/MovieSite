import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IMAGES from './avatars/Images.js';

function Profile() {
    const [users, setUsers] = useState([]);
    const [mygroups, setMyGroups] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
  
    const username = sessionStorage.getItem('username');
  
    // Function to fetch all groups
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/groups/user/${username}`);
        setMyGroups(response.data);
      } catch (error) {
        console.error('Error fetching My Groups:', error.response ? error.response.data : error.message);
      }
    };
  
    // Function to fetch watchlist movies
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/watchlist/${username}`);
        // Assuming the watchlist is an array, update the state
        if (Array.isArray(response.data)) {
          setWatchlist(response.data);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // If the response has a 'data' property and it's an array
          setWatchlist(response.data.data);
        } else {
          console.error('Invalid watchlist response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error.response ? error.response.data : error.message);
      }
    };
  
    // Function to fetch user information
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
      // Fetch groups and watchlist when the component mounts
      fetchGroups();
      fetchWatchlist();
    }, []);
  
    useEffect(() => {
      // Fetch user information when the username changes
      fetchUsers();
    }, [username]);
  
    const openMovieInfo = (id) => {
      console.log(`Opening MovieInfo for movie with ID ${id}`);
      window.location.href = `/movieinfo/?id=${id}`;
    };
  
    return (
        <div>
        <Container>
          <div>
            {users.map((user, index) => (
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
            ))}
          </div>
          <Row>
            <Col md={6}>
              <h2>My Groups</h2>
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
            <Col md={6}>
            <h2>Watchlist Movies</h2>
            {/* Watchlist Movies */}
            <div className="movie-container d-flex flex-wrap gap-3" style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
              {watchlist.map((movie) => (
                <div key={movie.moviedb_movieid} onClick={() => openMovieInfo(movie.moviedb_movieid)} style={{ textAlign: 'center', width: '180px', margin: '10px auto' }}>
                  <div style={{ border: '2px solid #ddd', borderRadius: '5px', padding: '10px', height: '100%' }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={`Poster for ${movie.title}`}
                      style={{ width: '150px', height: '225px', cursor: 'pointer', marginBottom: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                      className="img-fluid"
                    />
                    <p style={{ margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{movie.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    );
  }
  
  export default Profile;