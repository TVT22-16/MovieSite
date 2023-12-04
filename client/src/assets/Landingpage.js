import React,{useEffect, useState} from 'react'
import GetMovies from '../components/GetMoviesUpgraded';
import CarouselBS from '../components/Carousel';
import FinnkinoFetch from '../components/FinnkinoFetch';
import Reviews from '../components/Reviews';
import { useSearchParams } from 'react-router-dom';


const Landingpage = () => {

    const [landingMovies, setLandingMovies] = useState([]);

    const [backdroppath, setBackdroppath] = useState('');


    const [searchParams] = useSearchParams();

    const [reviewsB,setReviewsB] = useState(searchParams.get('reviews'));
    const [newsB,setNewsB] = useState(searchParams.get('news'));



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
            maxHeight:'150vh',
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
          marginLeft: '20px',
          marginRight: '20px',
          marginTop:'20px',
          gap: '20px',
          padding:'15px',
          height: '100%',
          // margin: 'auto auto',
        }}>
            {landingMovies.length > 0 && (
              <CarouselBS movies={landingMovies} updateBackdrop={updateBackdrop} />
              )}



              {reviewsB === 'true' && (

              <div style={{width:'60%'}}>
              {/* <h1 style={{margin:'auto auto', padding:'10px',width:'98%',fontWeight:'700', color:'white', backgroundColor:'black', opacity:'0.8', borderRadius:'5px', marginBottom:'5px'}}>Recent Reviews</h1> */}
              <div style={{height:'400px', borderRadius:'5px',overflowY:'scroll', display:'flex', flexDirection:'column' ,width:'100%', margin: 'auto auto'}}>
                <div style={{gap:'5px', display:'flex', flexDirection:'column'}}>
                  <Reviews dropdownOn={false}/>
                </div>
              </div>
              </div>

              )}
        </div>


        {newsB === 'true' && (

          <div className='News' style={{
          width:'75%',
          height: '700px',
          overflowY: 'scroll',
          // marginLeft:'50%',
          float:'right',
          backgroundColor: 'white',
          opacity: '0.9',
          borderRadius: '10px',
          marginBottom: '30px'}}>
            
          <FinnkinoFetch></FinnkinoFetch>
          </div>
        )}
        </div>
        
      );
}
 
export default Landingpage;