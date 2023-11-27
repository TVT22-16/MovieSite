import React,{useEffect, useState} from 'react'
import GetMovies from '../components/GetMoviesUpgraded';

const Landingpage = () => {

    const [landingMovies, setLandingMovies] = useState([]);

    const [backdroppath, setBackdroppath] = useState('');

    const updateLandingMovies = (movies) => {
        console.log(movies);
        setLandingMovies(movies);
    }
     
    useEffect(() => {
        if (landingMovies.length > 0) {
          // Set the backdrop path for the first movie
          setBackdroppath(landingMovies[0].backdrop_path);
        }
      }, [landingMovies]);

    return (
        <div      style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdroppath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            opacity:'0.9',

          }} >
           
            

          <ul>
            <GetMovies
                sort_by={'popularity.desc'}
                page={1}
                //no need to track pageamount on landing page so empty lamda
                updatePageAmount={() => ({})}
                updateMoviesData={updateLandingMovies}
                genres={[]}
            />

            {/* <img className='backdrop' src={`https://image.tmdb.org/t/p/original/${backdroppath}`} /> */}

            {landingMovies.length > 0 ? (
            //Get only first 5 movies
              landingMovies.slice(0,5).map((movie,index) => (
                <li key={movie.id}>
                    
                    {movie.title}

                    {/* <img className='backdrop' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} /> */}
                    
                    </li>
              ))
            
            ) : (
              <p>Waiting for movies...</p>
            )}
          </ul>


        </div>
      );
}
 
export default Landingpage;