import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const baseUrl = 'http://localhost:3001/movies';

  useEffect(() => {
    // Fetch popular movies when the component mounts
    axios.get(baseUrl)
      .then(response => setPopularMovies(response.data))
      .catch(error => console.error('Error fetching popular movies:', error));
  }, [baseUrl]); // Add baseUrl as a dependency to useEffect

  const handleSearch = () => {
    if (searchTerm) {
      axios.get(`${baseUrl}/${searchTerm}`) // Correct the search endpoint
        .then(response => setSearchResults(response.data))
        .catch(error => console.error('Error searching movies:', error));
    }
  };

  return (
    <div className='outerCont'>
      <h1>Movies</h1>
            
      <div className='searchCont'>
        <input id='searchBar'
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
        />
        <button id='searchBtn' onClick={handleSearch}>Search</button>
      </div>



      <ul className='listCont'>
        {searchResults.length > 0 ? (
          // Render search results if available
          searchResults.map(movie => (
            <li className='movieCard' key={movie.id}>
              <h3 className='movieTitle'>{movie.title}</h3>
              <img className='posterImg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" />
            </li>
          ))

          //else Render popular movies if no search results
        ) : (
          popularMovies.map(movie => (
            <li className='movieCard' key={movie.id}>
              <h3 className='movieTitle'>{movie.title}</h3>
              <img className='posterImg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Movies;