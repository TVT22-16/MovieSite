import React, { useState, useEffect } from 'react';
import axios from 'axios';

const movieByIdURL = 'http://localhost:3001/movies/id';

const Reviews = () => {
  const [getReviewsUrl, setGetReviewsUrl] = useState('http://localhost:3001/reviews')

  const [reviews, setReviews] = useState([]);
  const [reviewsWData, setReviewsWData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getReviewsUrl);
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
      <ul>
      {reviewsWData.length > 0 ? (
        <>
        {reviewsWData.map((item,index) => (
        <li>
          <ul>
            <li>{item.title}</li>

          </ul>
        </li>
        ))}
        </>
        ) : (

          <li>Loading reviews...</li>
          )

      }
      </ul>
    </div>
  );
};

export default Reviews;
