import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieInfo.css';
import { useSearchParams } from 'react-router-dom'
import ReviewForm from './ReviewForm';
import GetTrailers from './GetTrailers';
import Reviews from './Reviews';



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
  


  //backdrop image handling
  const [backdrop, setBackdrop] = useState('');
  useEffect(() => {
      // Set the backdrop path for the first movie
      setBackdrop(movieData.backdrop_path);
      console.log('backdrop is', backdrop)
  }, [movieData]);




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
      <div id='pageContainer'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', 
      }}>

      <div id='titleVoteContainer'>

        <h1 id='movieTitle'>{movieData.title}</h1>
        <h2 id='voteAverage'>{movieData.vote_average}</h2>

      </div>

        {/* <img id='infoPoster' src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt="Movie Poster" /> */}

        <div id='trailerInfoContainer'>
      
          <GetTrailers id={movieData.id} />

          <ul id='infoContainer'>
                <li id='tagline'>{movieData.tagline}</li>
                <li id='overview'>{movieData.overview}</li>
                {/* <li id='status'>Status: {movieData.status}</li> */}
                {/* <li >{movieData.genres}</li> */}
                <li id='releaseDate'>Release date: {movieData.release_date}</li>
          </ul>

        </div>

          <div style={{display: 'flex',flexDirection:'column',width:'80%', gap:'20px', alignItems:'center'}}>
            <Reviews movieid={params}> </Reviews>

          </div>
          <ReviewForm moviedb_movieid={params}/>



      <div id='similarContainer'>
                Similar Movies

      </div>


      </div>

  )
};

export default MovieInfo;