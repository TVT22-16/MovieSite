import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieInfo.css';
import { useSearchParams } from 'react-router-dom'
import ReviewForm from './ReviewForm';
import GetTrailers from './GetTrailers';
import Reviews from './Reviews';
import WatchlistButton from './WatchList';
import { Badge } from 'react-bootstrap';


//https://webtips.dev/solutions/get-query-params-in-react

const MovieInfo = () => {

  const [searchParams] = useSearchParams();
  const [movieData, setMovieData] = useState({});
  const [reviews, setReviews] = useState([])
 
  const params = searchParams.get('id');


  //Fetch moviedata by if from moviedatabase

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/movies/id/${params}`);
        const response = res.data;
        setMovieData(response);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };


  useEffect(() => {
    fetchData();
  }, [params]); //prevent endless loop caused by useEffect and useState (only do this if params changes)


  //backdrop image handling
  const [backdrop, setBackdrop] = useState('');

  useEffect(() => {
      // Set the backdrop path for the first movie
      setBackdrop(movieData.backdrop_path);
  }, [movieData]);




  //Fetch user reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/reviews/byMovieId/${params}`);
        const response = res.data;
        setReviews(response);
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

      <div id='titleVoteContainer' style={{
            display:'flex',
            margin:'10px',
            width:'50%',
            borderRadius:'6px',
            backgroundColor:'#2c3e50',
            flexDirection:'row',
            flexWrap:'wrap',
            gap:'10px',
        }}>

        <h1 id='movieTitle'>{movieData.title}</h1>

        <h2 id='voteAverage' style={{

              fontWeight: '600',
              borderRadius: '50%',
              display: 'flex',
              alignTtems: 'center', 
              justifyContent: 'center', 
              width: '40px',
              height:'40px', 
              backgroundColor: '#e74c3c',
              color: '#ecf0f1',
              fontSize: '14px', 
              marginTop:'auto',
              margin:'auto auto'

             }}>{movieData.vote_average}</h2>

        <div className='watchContainer' style={{
          flexGrow: '1',
          margin:'10px'
        }}>
        <WatchlistButton
          username= {sessionStorage.getItem('username')}  // Replace with the actual username
          moviedb_movieid={movieData.id}
          title={movieData.title}
          overview={movieData.overview}
          release_date={movieData.release_date}
          poster_path={movieData.poster_path}
        />
        </div>

      </div>

        {/* <img id='infoPoster' src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt="Movie Poster" /> */}

        <div id='trailerInfoContainer'>
      
          <GetTrailers id={movieData.id} />

          <ul id='infoContainer'>
                <li id='tagline'>{movieData.tagline} </li>
                <li id='overview'>{movieData.overview}</li>
                <li id='releaseDate'>Release date: {movieData.release_date}</li>
                {/* Map genres if defined */}

                <li style={{marginTop:'5px',display: 'flex', flexDirection: 'row', gap: '2px', flexWrap:'wrap'}}>
                  {movieData.genres &&
                    movieData.genres.map((genre) => (
                  <Badge key={genre.id} bg="secondary">{genre.name}</Badge>
                    ))}
                </li>


          </ul>
 
        </div>
        <ReviewForm moviedb_movieid={params}/>
        <div style={{display: 'flex', marginBottom:'2%',flexDirection:'column',width:'80%', gap:'20px', alignItems:'center'}}>
          <Reviews movieid={params}> </Reviews>
        </div>






      </div>

  )
};

export default MovieInfo;