
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const GetTrailers = () => {

    const [trailers,setTrailers] = useState([]);

    useEffect(()=>{

        const fetchTrailers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/movies/trailer/670292');
                setTrailers(response.data);
            } catch (error) {
                console.error('Error fetching trailers:', error);
            }
        };
    
        fetchTrailers();

    },[]); //Do when component mounts '[]'

    // console.log(trailers);

    return (
        <div>
            Trailers: 
            {/* {trailers.map((trailer) => (
                <div>{trailer.key}</div>
            ))} */}
            {/* {trailers[0]} */}
      </div>
    );
}
 
export default GetTrailers;


