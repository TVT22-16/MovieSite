import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'


//https://webtips.dev/solutions/get-query-params-in-react

const MovieInfo = () => {

  const [searchParams] = useSearchParams();
  const [movieData, setMovieData] = useState({});
  const [reviews, setReviews]=useState([])

  const params = searchParams.get('id');

  useEffect(() => {
    axios.get(`http://localhost:3001/movies/id/${params}`)
    .then(res => {
      const response = res.data;
      setMovieData(response);
    })
  },[params]); //prevent endless loop caused by useEffect and useState (only do this if params changes)

  useEffect(() => {
    axios.get(`http://localhost:3001/reviews/byMovieId/${params}`)
    .then(res => {
      const response = res.data;
      setReviews(response);
      console.log(response);
    })
  },[params]); //prevent endless loop caused by useEffect and useState (only do this if params changes)



  return (
      <div>
        <h1>{movieData.title}</h1>
        <img className='infoPoster' src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt="Movie Poster" />
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong> {review.username} </strong>
              <strong> {review.review} </strong>
              <strong> {review.rating} </strong>
            </li>
          ))}
        </ul>
      </div>

  )
};

export default MovieInfo;