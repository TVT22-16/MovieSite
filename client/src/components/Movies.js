import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';
import MovieInfo from './MovieInfo.js'
import ReviewForm from './ReviewForm.js';
import SearchBar from './Search.js';
import DropdownComponent from './Dropdown.js';
import PaginationComponent from './Pagination.js';
import GetMovies from './GetMoviesUpgraded.js';



const Movies = () => {


  //For opening movie info after clicking the movie card
  const openInfo = (id) => {
    console.log(`Movie with id ${id}`);

    window.location.href = `/movieinfo/?id=${id}`;
  };


  const [popularMovies, setPopularMovies] = useState([]);

  const [responsePageAmount, setResponsePageAmount] = useState({});

  const [searchResults, setSearchResults] = useState([]);

  const baseUrl = 'http://localhost:3001/movies';


  //popular, upcoming, top_rated
  const [filter, setFilter] = useState('popular');

  const updateFilter = (newFilter) => {
    setPage(1);
    setFilter(newFilter);
  };



  //result page number
  const [page, setPage] = useState(1);

  const updatePage = (p) =>{
    setPage(p);
  }


  const [searchTerm, setSearchTerm] = useState('');


  const updateSearchTerm = (searchInput) =>{
    setSearchTerm(searchInput);

  }



  // const [movies, setMovies] = useState([])


  // const updateMovies = (movies) => {
  //   setMovies(movies);
  // }
 
  const [sort_by, setSort_by] = useState('popularity.asc')

  const updateSort = (sort) => {
    setSort_by(sort)
  }


  useEffect(() => {
    // Fetch movies when component mounts
    if (searchTerm.length < 2){
      axios.get(`${baseUrl}/filters/${page}/${filter}`)
      .then(response =>{

        //set movies results and total page count
         setPopularMovies(response.data.results);
         setResponsePageAmount(response.data.total_pages);}
      
      )
      .catch(error => console.error('Error fetching popular movies:', error));
    }
  }, [baseUrl, page, filter]); // Add baseUrl, page, filter as a dependency to useEffect


  useEffect(()=>{

    if (searchTerm.length>2) {
      axios.get(`${baseUrl}/search/${page}/${searchTerm}`) 
        .then(response =>{ 
          setSearchResults(response.data.results);
          setResponsePageAmount(response.data.total_pages);

        })
        .catch(error => console.error('Error searching movies:', error));
    } else {
      setSearchResults([]);
      
    }
  },[searchTerm,page]);


  return (
    <div className='outerCont'>
      <h1>Movies</h1>

      <div className='searchCont'>
        
        <SearchBar updateSearchTerm={updateSearchTerm}/>
        <DropdownComponent childFilter={filter} updateFilter={updateFilter}/>

      </div>

      <PaginationComponent page={page} responsePageAmount={responsePageAmount} updatePage={updatePage}/>


      <ul className='listCont'>
        
        {searchResults.length > 0 ? (
          // Render search results if available
          searchResults.map(movie => (
            <li className='movieCard' key={movie.id}>
              <h3 className='movieTitle'>{movie.title}</h3>
              <img className='posterImg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" onClick={() => openInfo(movie.id)} />
              <h3 className='voteAverage'>{movie.vote_average}</h3>
            </li>
          ))

          //else Render popular movies if no search results
        ) : (
          // popularMovies.map(movie => (
          //   <li className='movieCard' key={movie.id}>
          //     <h3 className='movieTitle'>{movie.title}</h3>
          //     {/* To delay the execution of openInfo(movie.id) until the image is clicked, you need to wrap it in an arrow function: */}
          //     <img className='posterImg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" onClick={() => openInfo(movie.id)}/>
          //     <h3 className='voteAverage'>{movie.vote_average}</h3>
          //   </li>
          // ))
          <GetMovies sort_by={sort_by}/>


        )}
      </ul>

      <PaginationComponent page={page} responsePageAmount={responsePageAmount} updatePage={updatePage}/>
    </div>
  );
};

export default Movies;