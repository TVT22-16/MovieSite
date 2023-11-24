
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GetMovies = ({sort_by,page,updatePageAmount,updateMoviesData, genres}) => {


    // use OR separator in query
    let genresParam = genres.join('||');


    // const [movies, setMovies] = useState([]);
    console.log(`http://localhost:3001/movies/getMovies?page=${page}&sort_by=${sort_by}&with_genres=${genresParam}`);

    useEffect(() => {

        axios.get(`http://localhost:3001/movies/getMovies?page=${page}&sort_by=${sort_by}&with_genres=${genresParam}`).then(response =>{
            // setMovies(response.data.results);
            updateMoviesData(response.data.results);
            updatePageAmount(response.data.total_pages);

        }).catch(error => {
            console.log(error);
        });
        
    },[page,sort_by,genres]);


    return null;
}
 
export default GetMovies;