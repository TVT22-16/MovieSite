
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GetMovies = ({sort_by='',page='',updatePageAmount='',updateMoviesData, genres=''}) => {

    // use OR separator in query and recognize %2C as separator
    let genresParam = genres.join('||').replace(/,/g, '||');
        
    useEffect(() => {

        axios.get(`http://localhost:3001/movies/getMovies?page=${page}&sort_by=${sort_by}&with_genres=${genresParam}`).then(response =>{
            // setMovies(response.data.results);
            updateMoviesData(response.data.results);
            updatePageAmount(response.data.total_pages);

        }).catch(error => {
            console.log(error);
        });
        
    },[page,genresParam,sort_by]);


    return null;
}
 
export default GetMovies;