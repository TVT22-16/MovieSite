import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getReviews = 'http://localhost:3001/reviews';
const moviebyidURL = 'http://localhost:3001/movies/id';

// Custom function for making a GET request
// async function get(apiRoute) {
//   try {
//     const response = await axios.get(apiRoute);
//     return response.data;
//   } catch (err) {
//     return err;
//   }
// }

// const GetMovieById = async (id) => {
//   // console.log('id from function'+id);
//   try{
//     axios.get(`${moviebyidURL}/${id}`).then(response => {
//       return response.data;
//     });
//   } catch(err){
//     console.log(err);
//   }
// }
 


const  Reviews = () => {

    const [reviews, setReviews] = useState([]);
    const [movies, setMovies] = useState([]);

  //fetch reviews
    useEffect(() => {
      try{
        axios.get(getReviews).then(response => {
          setReviews(response.data);
        })

      }catch(err){
        console.log(err);
      }
    },[]);

    useEffect(() => {
      reviews.map((rev,index) => {
        console.log(rev.moviedb_movieid, index);

        
      })

    }, [reviews]);


  return (
    <div>
      REVIEWS...

    </div>
   );
}

export default Reviews;
