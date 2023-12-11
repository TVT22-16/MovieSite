import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import IMAGES from './avatars/Images.js';
import { Link } from 'react-router-dom';

import {forceUpdateMatch } from '../components/ConfirmUserSignal.js';


function Profile() {
  const [users, setUsers] = useState([]);
  const [mygroups, setMyGroups] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

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

  // Handle checkbox change
  const handleCheckboxChange = (event, movieId) => {
    const isChecked = event.target.checked;

    // Update the selected movies list based on the checkbox status
    setSelectedMovies((prevSelectedMovies) =>
      isChecked ? [...prevSelectedMovies, movieId] : prevSelectedMovies.filter((id) => id !== movieId)
    );
  };

  // Handle "Manage Watchlist" button click
  const handleManageWatchlist = async () => {
    try {
      // Remove selected movies from the watchlist
      await axios.post('http://localhost:3001/watchlist/remove', {
        username,
        moviedb_movieids: selectedMovies,
      });

      // Refresh the watchlist after removal
      fetchWatchlist();
    } catch (error) {
      console.error('Error removing movies from watchlist:', error.response ? error.response.data : error.message);
    } finally {
      // Clear the selected movies list
      setSelectedMovies([]);
    }
  };

  // Handle "Add to Watchlist" button click


  // Function to check if a movie is in the watchlist
  const checkIfMovieInWatchlist = async (username, moviedb_movieid) => {
    try {
      const response = await axios.get(`http://localhost:3001/watchlist/check/${username}/${moviedb_movieid}`);
      return response.data.isInWatchlist;
    } catch (error) {
      console.error('Error checking if movie is in watchlist:', error.response ? error.response.data : error.message);
      return false; // Assume movie is not in watchlist in case of an error
    }
  };

  return (
    <div>
      {forceUpdateMatch() === true ? (
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
                <Link
                  to={`/groups/${group.group_name}`}
                  key={group.group_name}
                  className="mb-3"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
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
                <div key={movie.moviedb_movieid} style={{ textAlign: 'center', width: '180px', margin: '10px auto' }}>
                  <div style={{ border: '2px solid #ddd', borderRadius: '5px', padding: '10px', height: '100%' }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={`Poster for ${movie.title}`}
                      style={{
                        width: '150px',
                        height: '225px',
                        cursor: 'pointer',
                        marginBottom: '10px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                      className="img-fluid"
                      onClick={() => openMovieInfo(movie.moviedb_movieid)}
                    />
                    <p style={{ margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {movie.title}
                    </p>
                    <Form.Check
                      type="checkbox"
                      checked={selectedMovies.includes(movie.moviedb_movieid)}
                      onChange={(event) => handleCheckboxChange(event, movie.moviedb_movieid)}
                      
                      id={`checkbox-${movie.moviedb_movieid}`}
                      className="mt-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <br></br>
        {selectedMovies.length > 0 && (
          <Button variant="danger" onClick={handleManageWatchlist}>
            Remove from watchlist
          </Button>
        )}
      </Container>


      ) : (<div>Unauthorized</div>)}
      
    </div>
  );
}

export default Profile;
