const pgPool = require('../postgre/connection');
const apiurl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
require('dotenv').config({path:('../.env')});
const axios = require('axios');




async function getPopularMovies(){

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB_API_KEY
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        return(response.data);
    })
    .catch(function (error) {
        console.log(error);
        return(error);
});
}


module.exports = {getPopularMovies};