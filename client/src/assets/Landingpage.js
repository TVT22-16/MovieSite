import React,{useEffect, useState} from 'react'
import GetMovies from '../components/GetMoviesUpgraded';
import CarouselBS from '../components/Carousel';
import FinnkinoFetch from '../components/FinnkinoFetch';
import Reviews from '../components/Reviews';


const Landingpage = () => {

    const [landingMovies, setLandingMovies] = useState([]);

    const [backdroppath, setBackdroppath] = useState('');

    const updateBackdrop = (p) => {
        setBackdroppath(p);
    }

    const updateLandingMovies = (movies) => {
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
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'background-image 0.5s ease-in-out'}} >

        <GetMovies
                sort_by={'popularity.desc'}
                page={1}
                //no need to track pageamount on landing page so empty lamda
                updatePageAmount={() => ({})}
                updateMoviesData={updateLandingMovies}
                genres={[]}
            />

        <div className='rowContainer' style={{
          display:'flex',
          flexDirection:'row',
          alignItems: 'center',
          marginLeft: '5%',
          gap: '10%'
          // margin: 'auto auto',
        }}>
            {landingMovies.length > 0 && (
              <CarouselBS movies={landingMovies} updateBackdrop={updateBackdrop} />
              )}

            <div className='News' style={{
              width:'65%',
              height: '400px',
              overflowY: 'scroll',
              // marginLeft:'50%',
              float:'right',
              marginTop: '50px',
              backgroundColor: 'white',
              opacity: '0.7',
              borderRadius: '10px',
              marginBottom: '50px'}}>
              <FinnkinoFetch></FinnkinoFetch>

              </div>  
        </div>

        <h1 style={{margin:'auto auto', fontWeight:'700', color:'white'}}>Recent Reviews</h1>
        <div style={{height:'400px', padding:'10px', borderRadius:'5px',overflowY:'scroll', display:'flex', flexDirection:'column' ,width:'80%', margin: 'auto auto', marginBottom:'50px'}}>
          <div style={{gap:'5px', display:'flex', flexDirection:'column'}}>
            <Reviews dropdownOn={false}/>
          </div>
        </div>

        </div>
        
      );
}
 
export default Landingpage;