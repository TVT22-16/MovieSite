// MovieApp.js (Frontend)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css'


const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const baseUrl = 'http://localhost:3001/movies';

  useEffect(() => {
    
    // Fetch popular movies when the component mounts
    axios.get(`${baseUrl}`) 
      .then(response => setPopularMovies(response.data))
      .catch(error => console.error('Error fetching popular movies:', error));
  }, []);


  return (
    <div>
      <h1>Movies</h1>
      <ul class='listCont'>
        {popularMovies.map(movie => (
          <li key={movie.id}>
            {movie.title}
            <img class='posterImg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Logo" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;