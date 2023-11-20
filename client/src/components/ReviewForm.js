

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieInfo.css';


//Add review button and form for movieInfo page

const ReviewForm = () => {

    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
      setShowForm(true);
    };
  
    return (
      <div id='reviewFormBody'>
      
        <button onClick={handleShowForm}>Add Review</button>
  
        {showForm && (
            <form id='reviewForm'>
                <label>
                    Review
                    <input type="text" name="review" size='20' rows="4" cols="50"/>
                </label>

                <label>
                    Rating (0-10.0)
                    <input type='number' name='rating'/>
                </label>


                <input type="submit" value="Submit" />
            </form>

        )}
      </div>
    );
  };

export default ReviewForm;