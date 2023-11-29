import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getReviews = 'http://localhost:3001/reviews';
const movieByIdURL = 'http://localhost:3001/movies/id';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewsWData, setReviewsWData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getReviews);
        setReviews(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const moviesInformationArray = await Promise.all(
          reviews.map(async (rev) => {
            const movieInformation = await axios.get(`${movieByIdURL}/${rev.moviedb_movieid}`);
            return movieInformation.data;
          })
        );

        setReviewsWData(moviesInformationArray);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMoviesData();
  }, [reviews]);


  return (
    <div>
      {reviewsWData.length > 0 ? (
        <>
        {reviewsWData.map((item,index) => (
        <div>{item.title} {reviews[index].review}</div>
        ))}
        </>

        ) : (
          <>
          <div>Loading reviews...</div>
          </>)

      }

    </div>
  );
};

export default Reviews;
