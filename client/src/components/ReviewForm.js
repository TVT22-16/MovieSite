

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieInfo.css';
import SliderComponent from './Slider';
import {clientServerMatch, forceUpdateMatch} from '../components/ConfirmUserSignal.js';

const baseUrl = 'http://localhost:3001'

//Add review button and form for movieInfo page

const ReviewForm = ({moviedb_movieid}) => {
  

    const addReviewUrl = `${baseUrl}/reviews/add`


    const [showForm, setShowForm] = useState(false);
    const [addReviewStatus, setAddReviewStatus] = useState({});


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

      if (forceUpdateMatch===true){
        axios.post(addReviewUrl, reviewData)
        .then(response => {
  
          setAddReviewStatus(response.data);
  
        })
        .catch(error => {
          // Handle error
          console.error('Error submitting review:', error);
        });

      }

      window.location.reload(false);
      
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

            {clientServerMatch.value===true ? (<button type="submit" className="btn btn-light" onClick={handleShowForm} style={{width:'20%'}}>
              Review Movie
            </button>) : (<button className="btn btn-light">Login to review movie</button>)}


          {/* double review error message */}
          {addReviewStatus.status === 'error' &&
          //  (<div style={{backgroundColor:'red', marginTop:'10px', padding: '5px', borderRadius:'5px'}}>{addReviewStatus.message}</div>)
          <div style={{marginTop:'5px'}} class="alert alert-danger" role="alert">{addReviewStatus.message}</div>}

        {showForm && (
          <form id="reviewForm" onSubmit={submitReviewForm}
          style={{
            gap:'15px',display:'flex',flexDirection:'column', width:'50%', backgroundColor:'white', borderRadius:'5px', padding:'10px', opacity:'0.75'
          }}>

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