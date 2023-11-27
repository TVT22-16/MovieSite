import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';
import SearchBar from './Search.js';
import DropdownComponent from './Dropdown.js';
import PaginationComponent from './Pagination.js';
import GetMovies from './GetMoviesUpgraded.js';
import GenrePicker from './GenrePicker.js';
import BootstrapCard from './BootstrapCardMovie.js';



const Movies = () => {


  //For opening movie info after clicking the movie card
  const openInfo = (id) => {
    console.log(`Movie with id ${id}`);

    window.location.href = `/movieinfo/?id=${id}`;
  };


  const [popularMovies, setPopularMovies] = useState([]);

  const [responsePageAmount, setResponsePageAmount] = useState({});


  const updatePageAmount = (total) => {

    setResponsePageAmount(total)
  }
   



  const [searchResults, setSearchResults] = useState([]);

  const baseUrl = 'http://localhost:3001/movies';




  //result page number
  const [page, setPage] = useState(1);

  const updatePage = (p) =>{
    setPage(p);
  }

  const [searchTerm, setSearchTerm] = useState('');


  const updateSearchTerm = (searchInput) =>{
    setSearchTerm(searchInput);
    setPage(1);

  }

  const [moviesData, setMoviesData] = useState([])


  const updateMoviesData = (movies) => {
    setMoviesData(movies);
  }
 
  const [sort_by, setSort_by] = useState('popularity.desc')

  const updateSort = (sort) => {
    setPage(1);
    setSort_by(sort)
  }

  const [genres,setGenres] = useState([]);

  const updateGenres = (genreState) => {
    setPage(1);
    setGenres(genreState);
  }
   

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
      <div className='searchCont'>
        
        <SearchBar updateSearchTerm={updateSearchTerm}/>
        <DropdownComponent updateSort={updateSort}/>
        <GenrePicker updateGenres={updateGenres}/>

      </div>

      <PaginationComponent page={page} responsePageAmount={responsePageAmount} updatePage={updatePage}/>

      {page}

      <ul className='listCont'>
        
        {searchResults.length > 0 ? (
          // Render search results if available
          searchResults.map(movie => (
            <li className='movieCard' key={movie.id}>
              <h3 className='movieTitle'>{movie.title}</h3>
              <img className='posterImg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" onClick={() => openInfo(movie.id)} />
              <h3 className='voteAverage'>{movie.vote_average}</h3>
              <h5>Votes: {movie.vote_count}</h5>

            </li>
          ))

          //else Render popular movies if no search results
        ) : (
          <>

          {/* fetch moviedata and update movies with "updateMoviesData"*/}
          <GetMovies sort_by={sort_by} page={page} updatePageAmount={updatePageAmount} updateMoviesData={updateMoviesData} genres={genres}/>

            {/* display moviedata */}
            {moviesData.map(movie => (
            <li className='movieCard' key={movie.id} onClick={() => openInfo(movie.id)} >
              {/* <h3 className='movieTitle'>{movie.title}</h3> */}
              {/* To delay the execution of openInfo(movie.id) until the image is clicked, you need to wrap it in an arrow function: */}
              {/* <img className='posterImg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" onClick={() => openInfo(movie.id)}/>
              <h3 className='voteAverage'>{movie.vote_average}</h3>
              <h5>Votes: {movie.vote_count}</h5> */}
               <BootstrapCard movie={movie}></BootstrapCard>


            </li>
            )) }
          </>
        )}
      </ul>

      {page}

      <PaginationComponent page={page} responsePageAmount={responsePageAmount} updatePage={updatePage}/>
    </div>
  );
};

export default Movies;