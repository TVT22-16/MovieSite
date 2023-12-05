import React,{useEffect, useState} from 'react'
import GetMovies from '../components/GetMoviesUpgraded';
import CarouselBS from '../components/Carousel';
import FinnkinoFetch from '../components/FinnkinoFetch';
import Reviews from '../components/Reviews';
import { useSearchParams, useNavigate } from 'react-router-dom';
import GenrePicker from '../components/GenrePicker';
import { Dropdown } from 'react-bootstrap';


const Landingpage = () => {

    const [landingMovies, setLandingMovies] = useState([]);

    const [backdroppath, setBackdroppath] = useState('');


    const [searchParams] = useSearchParams();

    const [reviewsB, setReviewsB] = useState(searchParams.get('reviews') || 'true');
    const [newsB,setNewsB] = useState(searchParams.get('news') || 'true');

    // const [genre,setGenre] = useState(searchParams.get('genre') || '');
    const [genre,setGenre] = useState(searchParams.get('genre'));

    const updateBackdrop = (p) => {
        setBackdroppath(p);
    }

    const navigate = useNavigate();

    const updateGenres = (g) => {
      
      setGenre(g);
      // Update the URL with the new genre
      searchParams.set('genre', g);
      navigate(`?${searchParams.toString()}`);
    };
  

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
      <div className='body' style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdroppath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        maxHeight:'150vh',
        opacity:'1',
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
          genres={[genre]}/>

        <div className='secondBody' style={{
            overflowY:'hidden',
            width:'70%',
            display:'flex',
            flexDirection:'column',
            margin:'auto auto', 
            justifyContent:'center',
            marginTop:'20px'
            }}>

          <SettingsButton style={{float:'right'}} updateGenres={updateGenres}></SettingsButton>
          



          <div className='rowContainer' style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',  // Add this line for horizontal centering
              gap:'10px',
              margin: 'auto auto',
              width:'100%'}}>


          <div className='carouselContainer' style={{flexGrow:'1'}}>
            {landingMovies.length > 0 && (
            <CarouselBS movies={landingMovies} updateBackdrop={updateBackdrop} />
            )}
          </div>

          {reviewsB === 'true' && (
          <ReviewsContainer></ReviewsContainer>
          )}

          </div>

          {newsB === 'true' && (
          <FkNews></FkNews>
          )}

        </div>
      </div>

      );
}

 const SettingsButton = ({updateGenres}) => {
  const handleSelect = (eventKey, e) => {
    // Prevent the default behavior of closing the dropdown
    e.preventDefault();

    // Add your custom logic for handling the selected item here
    console.log(`Selected option: ${eventKey}`);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {/* Three dots icon (ellipsis) */}
        <span>&#8285;</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* Add your settings options here */}
        <GenrePicker updateGenres={updateGenres}/>
        <Dropdown.Item eventKey="action2">Action 2</Dropdown.Item>
        <Dropdown.Item eventKey="action3">Action 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const FkNews = () => {
  return (
  
    <div className='News' style={{
      width: '100%',
      height: '700px',
      overflowY: 'scroll',
      // marginLeft:'50%',
      backgroundColor: 'white',
      opacity: '0.75',
      display:'flex',
      flexDirection:'column',
      margin:'auto auto',
      gap:'30px',
      padding:'5px',
      borderRadius: '10px',
      marginBottom: '30px',
      marginTop:'30px'}}>
        
      <FinnkinoFetch></FinnkinoFetch>
      </div>

    );
}
 
const ReviewsContainer  = () => {
  return (
    <div className='reviewsContainer' style={{
      width:'75%',
      minWidth:'75%', 
      opacity:'0.80'
      }}>

    <div style={{
        height:'400px',
        borderRadius:'5px',
        overflowY:'scroll',
        display:'flex', 
        flexDirection:'column' ,
        width:'100%', 
        margin: 'auto auto'
      }}>
      <div style={{gap:'5px', display:'flex', flexDirection:'column'}}>
        <Reviews dropdownOn={false} slicing={true}/>
      </div>
    </div>
    </div>
    );
}
 

export default Landingpage;