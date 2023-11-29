import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapCard from '../components/BootstrapCardMovie';
import { Card, CardFooter } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

const movieByIdURL = 'http://localhost:3001/movies/id';

const Reviews = () => {
  const [getReviewsUrl, setReviewsUrl] = useState('http://localhost:3001/reviews');
  const [reviews, setReviews] = useState([]);
  const [reviewsWData, setReviewsWData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getReviewsUrl);
        setReviews(response.data);
        setReviewsWData([]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [getReviewsUrl]);

  useEffect(() => {
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

    fetchMoviesData();
  }, [reviews]);

  // const fetchUserReviews = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3001/reviews/user/Roope');
  //     setReviews(response.data);
  //     setReviewsWData([]); // Reset reviewsWData when fetching user-specific reviews
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const updateGetReviewsUrl = (link) => {
    setReviewsUrl(link)
  }

  // const chunkArray = (arr, size) => {
  //   const chunkedArr = [];
  //   for (let i = 0; i < arr.length; i += size) {
  //     chunkedArr.push(arr.slice(i, i + size));
  //   }
  //   return chunkedArr;
  // };

  // const reviewsChunks = chunkArray(reviewsWData, 4);

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      {/* <button onClick={fetchUserReviews}>
        Your reviews
      </button> */}

      <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu>

      <Dropdown.Item onClick={() => updateGetReviewsUrl('http://localhost:3001/reviews')}>Reviews</Dropdown.Item>
      {/* <Dropdown.Item onClick={() => handleSortChange('popularity.asc')}>Popularity (ascending)</Dropdown.Item> */}

      <Dropdown.Item onClick={() => updateGetReviewsUrl('http://localhost:3001/reviews/user/Roope')}>Your reviews</Dropdown.Item>
      {/* <Dropdown.Item onClick={() => handleSortChange('vote_average.asc')}>Vote Average (ascending)</Dropdown.Item> */}


      </Dropdown.Menu>
    </Dropdown>


    {((reviewsWData.length > 0 && reviews.length > 0) ? (
        <>
          {reviewsWData.map((fd, index) => (
            <div key={index} style={{    
              display: 'grid',
              gridTemplateColumns:'repeat(4, 1fr)'}}>

              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${fd.poster_path}`} />
                <Card.Body>
                  <Card.Title>{fd.title} - {reviews[index].rating}</Card.Title>

                  <Card.Text>
                    {reviews[index].review}
                  </Card.Text>

                  <CardFooter>{reviews[index].username}</CardFooter>
                </Card.Body>
              </Card>
            </div>
          ))}
        </>
      ) : (
        <div>Loading reviews...</div>
      ))}
    </div>
  );
};

export default Reviews;
