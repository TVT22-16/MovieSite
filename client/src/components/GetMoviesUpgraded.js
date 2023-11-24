
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GetMovies = ({sort_by,page,updatePageAmount,updateMoviesData}) => {


    // const [movies, setMovies] = useState([]);

    useEffect(() => {

        // const params = {
        //     sort_by: sort_by,
        //     page: 2,
        //   };

        axios.get(`http://localhost:3001/movies/getMovies?page=${page}`).then(response =>{
            // setMovies(response.data.results);
            updateMoviesData(response.data.results);
            updatePageAmount(response.data.total_pages);

        }).catch(error => {
            console.log(error);
        });
        
    },[page]);


    return null;
}
 
export default GetMovies;