import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL =  'http://localhost:3001/reviews';

export function Reviews() {
    const [review, setReview] = React.useState(null);

    React.useEffect(() => {
      axios.get(baseURL).then((response) => {
        setReview(response.data);
      });
    }, []);
  
    if (!review) return null;
  
    return (
        <div id='body'>
        <ul class='listCont'>
                {review.map((rew, index) => (
                <li key={index} class='listInReview'>
                    <p>{(rew.username)}</p>
                    <p>{(rew.review)}</p> 
                    <p>{(rew.rating)}</p>

                    {/* //Fetches movie by movieId from moviedb */}
                    <p>{(()=>{
                        
                    })}</p>
                </li>
                ))}
        </ul>
        </div>
    );
  }


//https://www.freecodecamp.org/news/how-to-use-axios-with-react/




export default Reviews;