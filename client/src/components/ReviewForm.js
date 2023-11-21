

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieInfo.css';


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

      console.log(reviewData);
      console.log(moviedb_movieid);
      console.log(typeof(moviedb_movieid));

      axios.post(addReviewUrl, reviewData)
      .then(response => {
        // Handle successful submission
        console.log('Review submitted successfully');
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting review:', error);
      });
    }

    const handleShowForm = () => {
      setShowForm(true);
    };
  
    return (
      
        <div id='reviewFormBody'>

        <button onClick={handleShowForm}>Add Review</button>
  
        {showForm && (
            <form id='reviewForm' onSubmit={submitReviewForm}>
                <label htmlFor="review">Review</label>
                    {/* <input type="text" class='reviewBox' name="review" placeholder="Write your review here"/> */}
                    <textarea name="review" rows="4" cols="50" placeholder="Write your review here"></textarea>


                <label htmlFor="rating">Rating</label>
                    <input type="number" name="rating" className='ratingBox' placeholder="0-10.0" step="any" max="10.0" maxLength="4"/>


                <input className='submitBtn' type="submit" value="SUBMIT REVIEW"/>
            </form>

        )}
      </div>
    );
  };

export default ReviewForm;