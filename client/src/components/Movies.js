import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';
import MovieInfo from './MovieInfo.js'
import ReviewForm from './ReviewForm.js';
import SearchBar from './Search.js';
import DropdownComponent from './Dropdown.js';



const Movies = () => {

  const openInfo = (id) => {

    // console.log(event.target);
    console.log(`Movie with id ${id}`);

    window.location.href = `/movieinfo/?id=${id}`;
  };


  const [popularMovies, setPopularMovies] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const baseUrl = 'http://localhost:3001/movies';


  //popular, upcoming, top_rated
  const [filter, setFilter] = useState('popular');

  const updateFilter = (newFilter) => {
    console.log(newFilter);
    setFilter(newFilter);
  };



  //result page number
  const [page, setPage] = useState(1);

  const pageHandler = (p) =>{
    setPage(p);
  }


  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (searchInput) =>{
    setSearchTerm(searchInput);
    // handleSearch(searchTerm);
    console.log(searchInput);
  }


  useEffect(() => {
    // Fetch popular movies when the component mounts
    axios.get(`${baseUrl}/filters/${page}/${filter}`)
      .then(response => setPopularMovies(response.data))
      .catch(error => console.error('Error fetching popular movies:', error));
  }, [baseUrl, page, filter]); // Add baseUrl as a dependency to useEffect


  useEffect(()=>{

    if (searchTerm.length>2) {
      axios.get(`${baseUrl}/search/${searchTerm}`) 
        .then(response => setSearchResults(response.data))
        .catch(error => console.error('Error searching movies:', error));
    } else {
      setSearchResults([]);
      
    }

  },[searchTerm])


  const handleSearch = () => {
    console.log(`Search term is: ${searchTerm}`);
    // if (searchTerm === 'shrek'){
    //   axios.get(`${baseUrl}/filters/${page}/${filter}`)
    //   .then(response => setPopularMovies(response.data))
    //   .catch(error => console.error('Error fetching popular movies:', error));
    // }
    if (searchTerm) {
      axios.get(`${baseUrl}/search/${searchTerm}`) 
        .then(response => setSearchResults(response.data))
        .catch(error => console.error('Error searching movies:', error));
    }
  };

  return (
    <div className='outerCont'>
      <h1>Movies</h1>

      <div className='searchCont'>
        {/* <input id='searchBar'
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
        /> */}
        {/* <button id='searchBtn' onClick={handleSearch}>Search</button> */}
        
        <SearchBar updateSearchTerm={updateSearchTerm}/>
        <DropdownComponent childFilter={filter} updateFilter={updateFilter}/>
        
      </div>


      <ul className='listCont'>
        {searchResults.length > 0 ? (
          // Render search results if available
          searchResults.map(movie => (
            <li className='movieCard' key={movie.id}>
              <h3 className='movieTitle'>{movie.title}</h3>
              <img className='posterImg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" onClick={() => openInfo(movie.id)} />
            </li>
          ))

          //else Render popular movies if no search results
        ) : (
          popularMovies.map(movie => (
            <li className='movieCard' key={movie.id}>
              <h3 className='movieTitle'>{movie.title}</h3>
              {/* To delay the execution of openInfo(movie.id) until the image is clicked, you need to wrap it in an arrow function: */}
              <img className='posterImg' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie Poster" onClick={() => openInfo(movie.id,'/reviews')}/>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Movies;