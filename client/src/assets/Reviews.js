import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3001/reviews';
const moviebyidURL = 'http://localhost:3001/movies/id/';

// Custom function for making a GET request
async function get(apiRoute) {
  try {
    const response = await axios.get(apiRoute);
    return response.data;
  } catch (err) {
    return err;
  }
}

export function Reviews() {
  const [review, setReview] = React.useState(null);
  const [movies, setMovies] = React.useState([]);
  const [movieposters, setMoviePosters] = React.useState([]);

  // Fetch review data
  const fetchReviewData = async () => {
    try {
      const reviewData = await get(baseURL);
      setReview(reviewData);
    } catch (error) {
      console.error('Error fetching review data:', error);
    }
  };

  // Fetch movie data for each review
  const fetchMoviesForReviews = async () => {
    try {
      if (review) {
        // Get movieid from revewis
        const movieIds = review.map((rew) => rew.moviedb_movieid);

        // Fetch moviedatas
        const responses = await Promise.all(
          movieIds.map((movieId) => get(`${moviebyidURL}${movieId}`))
        );

        
        const movieTitles = responses.map((response) => response.title);
        const posters = responses.map((response) => response.poster_path);

        // Set information arrays
        setMovies(movieTitles);
        setMoviePosters(posters);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  useEffect(() => {
    // Fetch review data when the component mounts
    fetchReviewData();
  }, []);


//   This useEffect is set up to run fetchMoviesForReviews whenever review state changes.
  useEffect(() => {
    fetchMoviesForReviews();
  }, [review]); 

  if (!review || !movies) return null;

  return (
    <div id='body'>
      <ul className='listCont'>
        {review.map((rew, index) => (
          <li key={index} className='listInReview'>
            <p>{rew.username}</p>
            <p>{rew.review}</p>
            <p>{rew.rating}</p>


            {/* Movietitle */}
            <p>{movies[index]}</p>

            {/* Movie poster */}
            <img className='posterImg' src={`https://image.tmdb.org/t/p/w500${movieposters[index]}`} alt="Movie Poster" />

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
