import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieInfo.css';
import { useSearchParams } from 'react-router-dom'
import ReviewForm from './ReviewForm';
import GetTrailers from './GetTrailers';




//https://webtips.dev/solutions/get-query-params-in-react

const MovieInfo = () => {

  const [searchParams] = useSearchParams();
  const [movieData, setMovieData] = useState({});
  const [reviews, setReviews]=useState([])

  const params = searchParams.get('id');


  //Fetch moviedata by if from moviedatabase
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
  

  //Fetch user reviews
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
      <div id='pageContainer'>

        <h1 id='movieTitle'>{movieData.title} ({movieData.release_date})</h1>
        {/* <img id='infoPoster' src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt="Movie Poster" /> */}

        <GetTrailers id={movieData.id} />


        <div id='infoReviewContainer'>

            <ul id='infoContainer'>
              <li>Moviedb votes: {movieData.vote_average}</li>
                <li>{movieData.overview}</li>
            </ul>
              
            <ul id='reviewContainer'>
              {/* pass the movieid to the review form */}
            <ReviewForm moviedb_movieid={params}/>
              {/* foreach */}
              {reviews.map((review, index) => (
                <li key={index} className='reviewItem'>
                  <p id='pUsername'> {review.username}  </p> 
                  <p id='pRating'>Rating: {review.rating}  </p> 
                  <p id='pReview'>{review.review}  </p> 

                </li>
              ))}
            </ul>
        </div>

      <div id='similarContainer'>
                Similar Movies

      </div>


      </div>

  )
};

export default MovieInfo;