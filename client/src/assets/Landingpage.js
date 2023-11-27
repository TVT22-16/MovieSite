import React,{useEffect, useState} from 'react'
import GetMovies from '../components/GetMoviesUpgraded';

const Landingpage = () => {

    const [landingMovies, setLandingMovies] = useState([]);

    const [movieIndex,setMovieIndex] = useState(0)

    const updateLandingMovies = (movies) => {
        console.log(movies);
        setLandingMovies(movies);
    }
     
    // const updateMovieIndex = () => {
    //     setMovieIndex(movieIndex+1);
    // }

    return (
        <div>
          <h2>Landing Page Movies</h2>
    
          <ul>
            <GetMovies
                sort_by={'popularity.desc'}
                page={1}
                //no need to track pageamount on landing page so empty lamda
                updatePageAmount={() => ({})}
                updateMoviesData={updateLandingMovies}
                genres={[]}
            />

        
            {landingMovies.length > 0 ? (
            //Get only first 5 movies
              landingMovies.slice(0,5).map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))
            
            ) : (
              <p>Waiting for movies...</p>
            )}
          </ul>

        </div>
      );
}
 
export default Landingpage;