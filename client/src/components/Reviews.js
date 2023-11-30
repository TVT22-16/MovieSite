import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardFooter, Ratio } from 'react-bootstrap';
import { Dropdown, Button} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import DeleteReview from './DeleteReview';


const movieByIdURL = 'http://localhost:3001/movies/id';

const Reviews = ({byId=false}) => {
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [getReviewsUrl, setReviewsUrl] = useState(`http://localhost:3001/reviews/user/${username}`);
  const [reviews, setReviews] = useState([]);
  const [reviewsWData, setReviewsWData] = useState([]);

  const [filterState, setFilterState] = useState('Your Reviews');

  const updateFilterState = (state) => {
    setFilterState(state);
  }
   



  const fetchData = async () => {
    try {
      const response = await axios.get(getReviewsUrl);
      setReviews(response.data);
      setReviewsWData([]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getReviewsUrl]);


  const fetchMoviesData = async () => {
    try {
      const moviesInformationArray = await Promise.all(
        reviews.map(async (rev) => {
          const movieInformation = await axios.get(`${movieByIdURL}/${rev.moviedb_movieid}`);
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



  const updateGetReviewsUrl = (link,state) => {
    updateFilterState(state);
    setReviewsUrl(link)
    
  }

  const handleDelete = async (id) => {
    await DeleteReview(id);
    window.location.reload(true);
  }

  return (
    <>
    <Dropdown style={{marginRight: '20%', marginTop:'10px', marginLeft:'auto'}}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {filterState}
      </Dropdown.Toggle>

      <Dropdown.Menu>

      <Dropdown.Item onClick={() => updateGetReviewsUrl('http://localhost:3001/reviews','All reviews')}>All Reviews</Dropdown.Item>
    
      <Dropdown.Item onClick={() => updateGetReviewsUrl(`http://localhost:3001/reviews/user/${username}`,'Your reviews')}>Your reviews</Dropdown.Item>



      </Dropdown.Menu>
    </Dropdown>


    {((reviewsWData.length > 0 && reviews.length > 0) ? (
        <>
          {reviewsWData.map((fd, index) => (

          <Card key={index} style={{ display: 'flex', flexDirection: 'row', width: '80%', height: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>

          <Card.Img style={{ maxHeight: '90%', height: '200px', width: 'auto', margin:'12px' ,padding: '0px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}} variant="top" src={`https://image.tmdb.org/t/p/w500${fd.poster_path}`} />

          <Card.Body style={{ width: '100%', height: '100%', flexGrow: '1', gap: '10px', display: 'flex', flexDirection: 'column' }}>
            <Card.Title style={{fontWeight:'700', fontSize: '1.2rem', marginBottom: '5px' }}>{fd.title} ({reviews[index].rating})</Card.Title>

            {reviews[index].review.length > 0 && (
                <Card.Text style={{ flex: '1', fontStyle: 'italic', marginBottom: '10px', padding: '10px', border: '1px solid #337ab7', borderRadius: '8px', backgroundColor: '#d9edf7' }}>
                  {reviews[index].review}
                </Card.Text>
              )}

            <CardFooter>{reviews[index].username}</CardFooter>


            {reviews[index].username === username && (
              <Button onClick={() => handleDelete(reviews[index].review_id)} style={{margin: 'auto auto', marginBottom: '1%', height: '10%' }} variant="danger">
                Delete
              </Button>)}


          </Card.Body>

          </Card>


          ))}
        </>
      ) : (
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      ))}</>

  );
};



export default Reviews;