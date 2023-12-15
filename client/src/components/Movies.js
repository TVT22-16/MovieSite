import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';
import SearchBar from './Search.js';
import DropdownComponent from './Dropdown.js';
import PaginationComponent from './Pagination.js';
import GetMovies from './GetMoviesUpgraded.js';
import GenrePicker from './GenrePicker.js';
import BootstrapCard from './BootstrapCardMovie.js';
import { Badge, Card } from 'react-bootstrap';
import baseUrl from './baseUrl.js';



const Movies = () => {


  //For opening movie info after clicking the movie card
  const openInfo = (id) => {
    console.log(`Movie with id ${id}`);

    window.location.href = `/movieinfo/?id=${id}`;
  };



  const [responsePageAmount, setResponsePageAmount] = useState({});


  const updatePageAmount = (total) => {

    setResponsePageAmount(total)
  }

  const [searchResults, setSearchResults] = useState([]);

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
      axios.get(`${baseUrl}/movies/search/${page}/${searchTerm}`) 
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

          <div style={{
              width:'50%',
              display: 'flex',
              flexDirection:'column',
              alignItems: 'center',
              justifyContent:'center',
              gap:'10px',
              margin:'auto',
              marginBottom:'5px',
              marginTop:'20px'
            }}>

              <PaginationComponent page={page} responsePageAmount={responsePageAmount} updatePage={updatePage} />
              {/* <Badge style={{maxHeight: '100%',margin:'auto auto' ,fontSize: '15px', padding: '5px'}}>{page}</Badge> */}

        </div>


      <ul className='listCont'>
        
        {searchResults.length > 0 ? (
          // Render search results if available
          searchResults.map(movie => (
            <div key={movie.id} onClick={()=>openInfo(movie.id)}>
            <BootstrapCard key={movie.id} movie={movie} cardWidth = '14rem'></BootstrapCard>
            </div>
          ))
          //else Render popular movies if no search results
        ) : (
          <>
          {/* fetch moviedata and update movies with "updateMoviesData"*/}
          <GetMovies sort_by={sort_by} page={page} updatePageAmount={updatePageAmount} updateMoviesData={updateMoviesData} genres={[genres]}/>

            {/* display moviedata */}
            {moviesData.map(movie => (

              <div key={movie.id} onClick={()=>openInfo(movie.id)}>
                  <BootstrapCard key={movie.id} movie={movie} cardWidth = '14rem'></BootstrapCard>
              </div>


            )) }
          </>
        )}
      </ul>


      <div style={{
          width:'50%',
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent:'center',
          gap:'10px',
          margin:'auto',
          marginBottom:'5px',
          marginTop:'20px'
        }}>

        <PaginationComponent page={page} responsePageAmount={responsePageAmount} updatePage={updatePage} />
        {/* <Badge style={{maxHeight: '100%',margin:'auto auto' ,fontSize: '15px', padding: '5px'}}>{page}</Badge> */}

      </div>


      
    </div>
  );
};

export default Movies;