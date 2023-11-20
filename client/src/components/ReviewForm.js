

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieInfo.css';


//Add review button and form for movieInfo page

const ReviewForm = () => {

    const [showForm, setShowForm] = useState(false);

    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');


    const handleShowForm = () => {
      setShowForm(true);
    };
  
    return (
      
        <div id='reviewFormBody'>

        <button onClick={handleShowForm}>Add Review</button>
  
        {showForm && (
            <form id='reviewForm'>
                <label for="review">Review</label>
                    {/* <input type="text" class='reviewBox' name="review" placeholder="Write your review here"/> */}
                    <textarea name="review" rows="4" cols="50" placeholder="Write your review here"></textarea>


                <label for="rating">Rating</label>
                    <input type="number" name="rating" class='ratingBox' placeholder="0-10.0"/>


                <input class='submitBtn' type="submit" value="SUBMIT REVIEW" />
            </form>

        )}
      </div>
    );
  };

export default ReviewForm;