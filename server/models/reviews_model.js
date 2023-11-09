const pgPool = require('../postgre/connection');

const sql = {
    GET_REVIEWS: 'SELECT * FROM reviews',
    INSERT_REVIEW: 'INSERT INTO reviews (username, review, rating, moviedb_movieid,created_at) VALUES ($1,$2,$3,$4, NOW())',
    DELETE_REVIEW: 'DELETE FROM reviews WHERE review_id=$1;'

};

async function getReviews(){
    const result = await pgPool.query(sql.GET_REVIEWS);
    const rows = result.rows;
    return rows;
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



module.exports = {addReview,getReviews,deleteReview};
