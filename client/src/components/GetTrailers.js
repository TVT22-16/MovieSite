
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const GetTrailers = ({id}) => {

    const [trailers,setTrailers] = useState([]);


    useEffect(()=>{
        const fetchTrailers = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/movies/trailer/${id}`);
                setTrailers(response.data);
            } catch (error) {
                console.error('Error fetching trailers:', error);
            }
        };
    

        fetchTrailers();
    },[id]); //Do when component mounts '[]'



    return (
        <div className="videoResponsive">
            {/* {trailers.map((trailer) => (
                <div>{trailer.key}</div>
            ))} */}
            

            {/* Pass the last video from the array because it seems to be usually the main trailer */}
            {trailers.length > 0 && (
                 <YouTubeEmbed videoId={trailers[trailers.length - 1].key} />
            )}

      </div>
    );
}


const YouTubeEmbed = ({ videoId }) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  
    return (
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title="YouTube video player"
          allowFullScreen
          className='playerV'
        ></iframe>
    );
  };
  
 
export default GetTrailers;


