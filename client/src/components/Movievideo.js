
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetMovieVideos = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/872585/videos?language=en-US`, 
          {
            headers: {
              Authorization: process.env.REACT_APP_MOVIEDB_API_KEY
            }
          }
        );
        console.log(response.data.results);
        setData(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log('Environment variables:', process.env);
  }, []); // Empty dependency array ensures the effect runs only once (on mount)

  return (
    <div>
      {/* {data.map(video => (
        <h1>{video.key}</h1>
      ))} */}
      hello
    </div>
  );
};

export default GetMovieVideos;



        // try {
        //   const options = {
        //     method: 'GET',
        //     url: `https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`,
        //     headers: {
        //       accept: 'application/json',
        //       Authorization: process.env.MOVIEDB_API_KEY
        //     }
        //   };
      
        //   const response = await axios.request(options);
        //   // return response.data.results;
        //   return response.data;
          
        // } catch (error) {
        //   throw error;
        // }