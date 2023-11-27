import React,{useEffect, useState} from 'react'
import GetMovies from '../components/GetMoviesUpgraded';
import CarouselBS from '../components/Carousel';

const Landingpage = () => {

    const [landingMovies, setLandingMovies] = useState([]);

    const [backdroppath, setBackdroppath] = useState('');

    const updateBackdrop = (p) => {
        setBackdroppath(p);
    }

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
        <div style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdroppath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            opacity:'0.9',

            display: 'flex',
            flexDirection: 'row',
            transition: 'background-image 0.5s ease-in-out',


          }} >
        <GetMovies
                sort_by={'popularity.desc'}
                page={1}
                //no need to track pageamount on landing page so empty lamda
                updatePageAmount={() => ({})}
                updateMoviesData={updateLandingMovies}
                genres={[]}
            />

        {landingMovies.length > 0 && (
            <CarouselBS movies={landingMovies} updateBackdrop={updateBackdrop}/>
        )}

        


        </div>
      );
}
 
export default Landingpage;