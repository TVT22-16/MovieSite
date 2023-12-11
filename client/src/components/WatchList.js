import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const WatchlistButton = ({ moviedb_movieid, title, overview, release_date, poster_path }) => {
  const [isAdded, setIsAdded] = useState(false);

  // Retrieve username from sessionStorage
  const username = sessionStorage.getItem('username');

  const handleAddToWatchlist = async () => {
    try {
      // Check if the movie is already in the watchlist for the user
      const isMovieInWatchlist = await checkIfMovieInWatchlist(username, moviedb_movieid);

      if (isMovieInWatchlist) {
        alert('This movie is already in your watchlist.');
      } else {
        // Movie is not in the watchlist, proceed with adding
        await axios.post('http://localhost:3001/watchlist/add', {
          username,
          moviedb_movieid,
          title,
          overview,
          release_date,
          poster_path,
        });
        setIsAdded(true);
        alert('Movie added to watchlist successfully!');
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status
        console.error('Error response from server:', error.response.data);
        alert(error.response.data.error || 'Error adding to watchlist. Please try again.');
      } else {
        // Something else happened
        console.error('Unexpected error:', error.message);
        alert('Error adding to watchlist. Please try again.');
      }
    }
  };

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
    <Button style={{float:'right', marginLeft:'auto'}} variant={isAdded ? 'success' : 'primary'} onClick={handleAddToWatchlist} disabled={isAdded}>
      {isAdded ? 'Added to Watchlist' : 'Add to Watchlist'}
    </Button>
  );
};

export default WatchlistButton;
