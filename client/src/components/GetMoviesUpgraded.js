
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GetMovies = ({sort_by}) => {
    console.log(sort_by)

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const fetchMovies = async () =>{
            try{
                axios.get('http://localhost:3001/movies/getMovies').then(response =>{
                    setMovies(response.data.results);
                    console.log(movies);
                })

            } catch(error){
                console.log(error);
            }

        }

        fetchMovies();
        
    }, []);


    return (
        <div>
            {sort_by}

        </div>
      );
}
 
export default GetMovies;