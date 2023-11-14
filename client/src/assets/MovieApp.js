// MovieApp.js (Frontend)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const baseUrl = 'http://localhost:3001/movies';

  useEffect(() => {
    
    // Fetch popular movies when the component mounts
    axios.get(`${baseUrl}`) // Assuming your Express API is served at the same host:port
      .then(response => setPopularMovies(response.data))
      .catch(error => console.error('Error fetching popular movies:', error));
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      axios.get(`${baseUrl}/${searchTerm}`)
        .then(response => setSearchResults(response.data))
        .catch(error => console.error('Error searching movies:', error));
    }
  };

  const handleMovieClick = (id) => {
    axios.get(`${baseUrl}/id/${id}`)
      .then(response => setSelectedMovie(response.data))
      .catch(error => console.error('Error fetching movie details:', error));
  };

  return (
    <div>
      <h1>Movie App</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies..."
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Popular Movies</h2>
      <ul>
        {popularMovies.map(movie => (
          <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            {movie.title}
          </li>
        ))}
      </ul>

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map(movie => (
              <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                {movie.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedMovie && (
        <div>
          <h2>Selected Movie Details</h2>
          <pre>{JSON.stringify(selectedMovie, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MovieApp;