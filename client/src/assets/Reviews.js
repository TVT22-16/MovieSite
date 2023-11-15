import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3001/reviews';
const moviebyidURL = 'http://localhost:3001/movies/id/';

export function Reviews() {
  const [review, setReview] = React.useState(null);
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(baseURL);
        setReview(response.data);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchReviewData();
  }, []);

  React.useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Assuming movieid is available in the review data
        const movieId = review?.[0]?.moviedb_movieid; // Adjust this based on your data structure

        if (movieId) {
          const response = await axios.get(`${moviebyidURL}${movieId}`);
          setMovie(response.data.title);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [review]); //runs if moviedata changes

  if (!review || !movie) return null;

  return (
    <div id='body'>
      <ul className='listCont'>
        {review.map((rew, index) => (
          <li key={index} className='listInReview'>
            <p>{rew.username}</p>
            <p>{rew.review}</p>
            <p>{rew.rating}</p>

            {/* Display movie title */}
            <p>{movie}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
