
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



    return (
        <div>
            {/* {trailers.map((trailer) => (
                <div>{trailer.key}</div>
            ))} */}
            

            {/* Pass the last video from the array */}
            {trailers.length > 0 && (
                 <YouTubeEmbed videoId={trailers[trailers.length - 1].key} />
            )}

      </div>
    );
}


const YouTubeEmbed = ({ videoId }) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <div className="video-responsive">
        <iframe
          width="720"
          height="406"
          src={embedUrl}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  
 
export default GetTrailers;


