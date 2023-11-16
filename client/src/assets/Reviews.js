import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css';

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
  const [review, setReview] = React.useState([]);
  const [movies, setMovies] = React.useState([]);

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
      if (review.length > 0) {
        // Get movieid from reviews
        const movieIds = review.map((rew) => rew.moviedb_movieid);

        // Fetch moviedatas
        const responses = await Promise.all(
          movieIds.map((movieId) => get(`${moviebyidURL}${movieId}`))
        );

        // Create an array of movie objects
        const movieDatas = responses.map((response) => ({
          id: response.id,
          title: response.title,
          poster_path: response.poster_path,
          release_date: response.release_date,
        }));

        // Set the movies state
        setMovies(movieDatas);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  useEffect(() => {
    // Fetch review data when the component mounts
    fetchReviewData();
  }, []);

  // This useEffect is set up to run fetchMoviesForReviews whenever review state changes.
  useEffect(() => {
    fetchMoviesForReviews();
  }, [review]); 

  if (!review.length || !movies.length) return null;

  return (
    <div id='body'>
      <ul className='listContRew'>
        {review.map((rew, index) => (
          <li key={index} className='listInReview'>

            <p>Reviewer: {rew.username}</p>
            <p>{rew.review}</p>
            <p>Rating: {rew.rating}</p>

            {/* <p>{movies[index].id}</p> */}

            {/* Movietitle */}
            <p>{movies[index].title} ({movies[index].release_date})</p>

            {/* Movie poster */}
            <img className='posterImgRew' src={`https://image.tmdb.org/t/p/w500${movies[index].poster_path}`} alt="Movie Poster" />

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;