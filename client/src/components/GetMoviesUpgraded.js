
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GetMovies = ({sort_by,page,updatePageAmount,updateMoviesData}) => {


    // const [movies, setMovies] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:3001/movies/getMovies?page=${page}&sort_by=${sort_by}`).then(response =>{
            // setMovies(response.data.results);
            updateMoviesData(response.data.results);
            updatePageAmount(response.data.total_pages);

        }).catch(error => {
            console.log(error);
        });
        
    },[page,sort_by]);


    return null;
}
 
export default GetMovies;