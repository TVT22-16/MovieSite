const pgPool = require('../postgre/connection');
const apiurl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
require('dotenv').config({path:('../.env')});
const axios = require('axios');

//popular
//top_rated
//upcoming



//

async function getPopularMovies(filter,page) {
    try {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=${page}`,
        headers: {
          accept: 'application/json',
          Authorization: process.env.MOVIEDB_API_KEY
        }
      };
  
      const response = await axios.request(options);
      // return response.data.results;
      return response.data;
      
    } catch (error) {
      throw error;
    }
  }

async function getMoviesUpgraded(sort_by,vote_averagegte,with_genres,release_dategte, page){


  try {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&release_date.gte=${release_dategte}&sort_by=${sort_by}&vote_average.gte=${vote_averagegte}&with_genres=${with_genres}`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB_API_KEY
      }
    };

    const response = await axios.request(options);
    return response.data;
    
  } catch (error) {
    throw error;
  }

  //   MOVIE GENRE ID
// Action          28
// Adventure       12
// Animation       16
// Comedy          35
// Crime           80
// Documentary     99
// Drama           18
// Family          10751
// Fantasy         14
// History         36
// Horror          27
// Music           10402
// Mystery         9648
// Romance         10749
// Science Fiction 878
// TV Movie        10770
// Thriller        53
// War             10752
// Western         37
}

async function searchMovies(search,page){
  try {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}&query=${search}`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB_API_KEY
      }
    };


    const response = await axios.request(options);
    return response.data;
    
  } catch (error) {
    throw error;
  }
}

//const url = 'https://api.themoviedb.org/3/find/external_id?external_source=';

async function getMovieByID(id){
  try {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB_API_KEY
      }
    };


    const response = await axios.request(options);
    return response.data;
    
  } catch (error) {
    throw error;
  }
}


async function getMovieTrailer(id){
  try {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB_API_KEY
      }
    };


    const response = await axios.request(options);
    return response.data.results;
    
  } catch (error) {
    throw error;
  }
}

module.exports = {getPopularMovies,searchMovies,getMovieByID, getMovieTrailer, getMoviesUpgraded};

