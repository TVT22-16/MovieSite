import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieInfo.css';
import { useSearchParams } from 'react-router-dom'
import ReviewForm from './ReviewForm';


//https://webtips.dev/solutions/get-query-params-in-react

const MovieInfo = () => {

  const [searchParams] = useSearchParams();
  const [movieData, setMovieData] = useState({});
  const [reviews, setReviews]=useState([])

  const params = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/movies/id/${params}`);
        const response = res.data;
        setMovieData(response);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
  
    fetchData();
  }, [params]); //prevent endless loop caused by useEffect and useState (only do this if params changes)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/reviews/byMovieId/${params}`);
        const response = res.data;
        setReviews(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    fetchData();
  }, [params]); //prevent endless loop caused by useEffect and useState (only do this if params changes)



  return (
      <div id='movieInfoBody'>
        <div class='infoContainer'>
          <div class='imgTitleContainer'>
            <h1 class='movieTitle'>{movieData.title} ({movieData.release_date})</h1>
            <img className='infoPoster' src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt="Movie Poster" />
            <ul id='themoviedbInfo'>
              <li>Moviedb votes: {movieData.vote_average}</li>
              <li>Overview: {movieData.overview}</li>
            </ul>
          </div>

          
        <ul class='reviewContainer'>
        <ReviewForm/>

          {/* foreach */}
          {reviews.map((review, index) => (
            <li key={index} class='reviewItem'>
              <p id='pUsername'> {review.username}  </p> 
              <p id='pRating'>Rating: {review.rating}  </p> 
              <p id='pReview'>{review.review}  </p> 

            </li>
          ))}
        </ul>
        </div>
      </div>

  )
};

export default MovieInfo;