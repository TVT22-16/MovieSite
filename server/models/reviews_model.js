const pgPool = require('../postgre/connection');

const sql = {
    GET_REVIEWS: 'SELECT * FROM reviews',
    GET_REVIEWS_USER: 'SELECT * FROM reviews WHERE username=$1',
    GET_REVIEWS_MOVIEDB_MOVIEID: 'SELECT * FROM reviews WHERE moviedb_movieid=$1',
    INSERT_REVIEW: 'INSERT INTO reviews (username, review, rating, moviedb_movieid,created_at) VALUES ($1,$2,$3,$4, NOW())',
    DELETE_REVIEW: 'DELETE FROM reviews WHERE review_id=$1;'

};

async function getReviews(){
    const result = await pgPool.query(sql.GET_REVIEWS);
    const rows = result.rows;
    return rows.reverse();
}

async function getReviewsUser(username){
  const result = await pgPool.query(sql.GET_REVIEWS_USER,[username]);
  const rows = result.rows;
  return rows.reverse();
}

async function getReviewsMovieId(moviedb_movieid){
  const result = await pgPool.query(sql.GET_REVIEWS_MOVIEDB_MOVIEID,[moviedb_movieid]);
  const rows = result.rows;
  return rows.reverse();
}

async function addReview(username, review, rating, moviedb_movieid) {
    try {
      const result = await pgPool.query(sql.INSERT_REVIEW, [username, review, rating, moviedb_movieid]);
      console.log(result); // Log the result of the query if needed
    } catch (error) {
      console.error(error);
    }
}

async function deleteReview(review_id){
  try{
    const result = await pgPool.query(sql.DELETE_REVIEW,[review_id]);
    console.log(`Review with id=${review_id} was deleted`);
  } catch (error){
    console.error(error);
  }
}



module.exports = {addReview,getReviews,deleteReview,getReviewsUser,getReviewsMovieId};
