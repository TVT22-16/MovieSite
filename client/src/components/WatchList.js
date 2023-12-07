// WatchlistButton.js

import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const WatchlistButton = ({ username, moviedb_movieid, title, overview, release_date, poster_path }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToWatchlist = async () => {
    try {
      await axios.post('http://localhost:3001/watchlist/add', {
        username,
        moviedb_movieid,
        title,
        overview,
        release_date,
        poster_path,
      });

      setIsAdded(true);
      alert('Movie added to watchlist!');
    } catch (error) {
      console.error('Error adding movie to watchlist:', error.response ? error.response.data : error.message);
      alert('Error adding movie to watchlist. Please try again.');
    }
  };

  return (
    <Button style={{float:'right', marginLeft:'auto'}}variant={isAdded ? 'success' : 'primary'} onClick={handleAddToWatchlist} disabled={isAdded}>
      {isAdded ? 'Added to Watchlist' : 'Add to Watchlist'}
    </Button>
  );
};

export default WatchlistButton;
