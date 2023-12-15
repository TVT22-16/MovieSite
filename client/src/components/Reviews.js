import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Card, CardFooter, Ratio } from 'react-bootstrap';
import { Dropdown, Button} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import DeleteReview from './DeleteReview';
import {clientServerMatch,forceUpdateMatch} from '../components/ConfirmUserSignal.js';
import baseUrl from './baseUrl.js';

//reviews/getReviews?username=&movieid=

const Reviews = ({movieid='', dropdownOn=true, slicing=false, customScale=''}) => {

  const custScale=customScale;

  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [getReviewsUrl, setReviewsUrl] = useState(`${baseUrl}/reviews/getReviews?username=&movieid=${movieid}`);
  const [reviews, setReviews] = useState([]);
  const [reviewsWData, setReviewsWData] = useState([]);
  const [latestStatus, setLatestStatus] = useState(404);

  const [filterState, setFilterState] = useState('All reviews');

  const updateFilterState = (state) => {
    setFilterState(state);
  }

  const openInfo = (id) => {
    console.log(`Movie with id ${id}`);

    window.location.href = `/movieinfo/?id=${id}`;
  };
   

  const fetchData = async (slicing) => {
    try {
      const response = await axios.get(getReviewsUrl);

      slicing === true ? (setReviews((response.data.results).slice(0,5))) : (setReviews(response.data.results));
      setLatestStatus(response.status);
      console.log('Reponsestatus: ',response.status)
      setReviewsWData([]);
    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    fetchData(slicing);
  }, [getReviewsUrl]);


  const fetchMoviesData = async () => {
    try {
      const moviesInformationArray = await Promise.all(
        reviews.map(async (rev) => {
          const movieInformation = await axios.get(`${baseUrl}/movies/id/${rev.moviedb_movieid}`);
          return movieInformation.data;
        })
      );

      setReviewsWData(moviesInformationArray);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMoviesData();
  }, [reviews]);



  const updateGetReviewsUrl = (params,state) => {
    updateFilterState(state);
    setReviewsUrl(`${baseUrl}/reviews/getReviews?${params}`)
  }

  const handleDelete = async (id) => {
    await DeleteReview(id);
    window.location.reload(true);
  }

  return (
    <>
    {dropdownOn === true && (

      <Dropdown style={{float:'right', marginTop:'10px', marginLeft:'auto'}}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {filterState}
      </Dropdown.Toggle>

      <Dropdown.Menu>

      <Dropdown.Item onClick={() => updateGetReviewsUrl(`movieid=${movieid}`,'All reviews')}>All Reviews</Dropdown.Item>
      {forceUpdateMatch()===true && (<Dropdown.Item onClick={() => updateGetReviewsUrl(`username=${username}&movieid=${movieid}`,'Your reviews')}>Your reviews</Dropdown.Item>)}
     



      </Dropdown.Menu>
      </Dropdown>

    )}



    {((reviewsWData.length > 0 && reviews.length > 0) ? (
        <>
          {reviewsWData.map((fd, index) => (

          <Card className='reviewCardCont' onClick={() => openInfo(fd.id)} key={index} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '50%',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    borderRadius: '8px',
                    transform: customScale ? `scale(${customScale})` : 'none',

                 }}>
            <div className='cardInsideCont'>
              <Card.Img className='cardImageReview' style={{ maxHeight: '90%', height: '150px', width: 'auto', margin:'12px' ,padding: '0px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} variant="top" src={`https://image.tmdb.org/t/p/w500${fd.poster_path}`}/>

            </div>

            
            <div className='cardBodyContainer' style={{width:'100%',height:'100%'}}>
              <Card.Body style={{ width: '100%', height: '100%', flexGrow: '1', gap: '10px', display: 'flex', flexDirection: 'column' }}>
                
                <div className='cardTitleContainer'>
                  <Card.Title style={{fontWeight:'700' ,fontSize: '1.2rem', marginBottom: '5px' }}>{fd.title} ({reviews[index].rating})</Card.Title>
                </div>

                <div className='cardTextContainer'>
                  {reviews[index].review.length > 0 && (
                      <Card.Text style={{ flex: '1', fontStyle: 'italic', marginBottom: '10px', padding: '10px', border: '1px solid #337ab7', borderRadius: '8px', backgroundColor: '#d9edf7' }}>
                        {reviews[index].review}
                      </Card.Text>
                    )}

                <CardFooter>{reviews[index].username === username ? ('My review'):(reviews[index].username)}</CardFooter>
                </div>

                {reviews[index].username === username && dropdownOn === true && forceUpdateMatch()===true &&  (
                  <Button onClick={() => handleDelete(reviews[index].review_id)} style={{margin: 'auto auto', marginBottom: '1%', height: '5%' }} variant="danger">
                    Delete
                  </Button>)}


              </Card.Body>
              </div>

          </Card>


          ))}
        </>
      ) : (<>
        {console.log(latestStatus)}
        {latestStatus===204 ? (
        
          <h3><span class="badge bg-success">This movie has not been reviewed yet</span></h3>
        
        ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        )}
        </>
      ))}</>

  );
};



export default Reviews;