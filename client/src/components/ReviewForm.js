

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieInfo.css';
import SliderComponent from './Slider';


//Add review button and form for movieInfo page

const ReviewForm = ({moviedb_movieid}) => {
  

    const addReviewUrl = 'http://localhost:3001/reviews/add'


    const [showForm, setShowForm] = useState(false);

    const submitReviewForm = (event) =>{

      // Hide form when submitting
      setShowForm(false);

      event.preventDefault(); 

      const reviewData = {
        username: sessionStorage.getItem('username'),
        moviedb_movieid: moviedb_movieid,
        review: event.target.review.value,
        rating: event.target.rating.value,
      };

      axios.post(addReviewUrl, reviewData)
      .then(response => {
        // Handle successful submission
        console.log('Review submitted successfully');
        window.location.reload(true);
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting review:', error);
      });
    }




    const handleShowForm = () => {
      if (showForm === true){
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    };

  
    return (
      <div id="reviewFormBody" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <button type="submit" className="btn btn-light" onClick={handleShowForm} style={{width:'20%'}}>
              Review Movie
            </button>
    
        {showForm && (
          <form id="reviewForm" onSubmit={submitReviewForm}
          style={{
            gap:'15px',display:'flex',flexDirection:'column', width:'50%', backgroundColor:'white', borderRadius:'5px', padding:'10px', opacity:'0.75'
          }}>
            {/* <textarea
              name="review"
              rows="4"
              cols="100"
              placeholder="Write your review here"
              className="reviewBox"
              
              style={{width:'100%'}}
            /> */}
            <div style={{width:'100%'}}>
            <textarea
              id="review"
              name="review"

              className="input-xlarge"

              style={{width:'100%'}}
            />
            </div>


            <SliderComponent></SliderComponent>
          
  
            <button type="submit" className="btn btn-success">
              Submit review
            </button>

          </form>
        )}
      </div>
    );
    
  };

export default ReviewForm;