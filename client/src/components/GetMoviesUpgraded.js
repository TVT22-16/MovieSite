
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GetMovies = ({sort_by,page,updatePageAmount}) => {


    const [movies, setMovies] = useState([]);

    useEffect(() => {

        // const params = {
        //     sort_by: sort_by,
        //     page: 2,
        //   };

        axios.get(`http://localhost:3001/movies/getMovies?page=${page}`).then(response =>{
            setMovies(response.data.results);
            updatePageAmount(response.data.total_pages);

            console.log(movies);
        }).catch(error => {
            console.log(error);
        });
        
    },[page]);


    return (
        <div>
            {movies.length > 0 && (
            <div>
                {movies.map((movie) => (
                <h1 key={movie.id}>{movie.title}</h1>
                ))}
            </div>
            )}







        </div>
      );
}
 
export default GetMovies;