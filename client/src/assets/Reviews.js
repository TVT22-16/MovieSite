import React, { useState, useEffect } from 'react';
import axios from 'axios';

const movieByIdURL = 'http://localhost:3001/movies/id';

const Reviews = () => {
  const [getReviewsUrl, setGetReviewsUrl] = useState('http://localhost:3001/reviews');
  const [reviews, setReviews] = useState([]);
  const [reviewsWData, setReviewsWData] = useState([]);
  const [finalData, setFinalData] = useState([]);

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
  }, [getReviewsUrl]);

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



  // useEffect(() => {
  //   // setFinalData(Array.prototype.push.apply(reviews, reviewsWData);
  //   // Array.prototype.push.apply(reviews, reviewsWData)
  //   // setFinalData(reviews.concat(reviewsWData));
  //   setFinalData((finalData) => [...reviews, ...reviewsWData]);

  // }, [reviewsWData]);

  return (
    <div>
    {(reviewsWData.length > 0 ? (<>{reviewsWData.map((fd,index) => (
        <>
          <div>{fd.title}</div>
          <div>{reviews[index].review}</div>
        </>


      ))}</>) : (
      
      <div> Loading reviews...</div>))
    }
    </div>
  );
};

export default Reviews;

