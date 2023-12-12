const pgPool = require('../postgre/connection');

const sql = {
    GET_REVIEWS_USER: 'SELECT * FROM reviews WHERE username=$1',
    GET_REVIEWS_MOVIEDB_MOVIEID: 'SELECT * FROM reviews WHERE moviedb_movieid=$1',
    INSERT_REVIEW: 'INSERT INTO reviews (username, review, rating, moviedb_movieid,created_at) VALUES ($1,$2,$3,$4, NOW())',
    DELETE_REVIEW: 'DELETE FROM reviews WHERE review_id=$1;',

    
    GET_REVIEWS: 'SELECT * FROM reviews',
    GET_REV_USER: 'SELECT * FROM reviews WHERE username=$1',
    GET_REV_USERMOVIE: 'SELECT * FROM reviews WHERE username=$1 AND moviedb_movieid=$2',
    GET_REV_MOVIE: 'SELECT * FROM reviews WHERE moviedb_movieid=$1'
};


async function getReviewsUpgraded(username = '', movieid = '') {
  let result;

  if (username.length < 1 && movieid.length < 1) {
    result = await pgPool.query(sql.GET_REVIEWS);
  } else if (username.length > 0 && movieid.length < 1) {
    result = await pgPool.query(sql.GET_REV_USER, [username]);
  } else if (username.length < 1 && movieid.length > 0) {
    result = await pgPool.query(sql.GET_REV_MOVIE, [movieid]);
  } else {
    result = await pgPool.query(sql.GET_REV_USERMOVIE, [username, movieid]);
  }

  const rows = result.rows;

  // Sort the rows by created_at in descending order (newest to oldest)
  const sortedRows = rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return sortedRows;
}

async function addReview(username, review, rating, moviedb_movieid) {
    try {
      const test = await pgPool.query(sql.GET_REV_USERMOVIE, [username, moviedb_movieid]);
      if(test.rowCount < 1){
        const result = await pgPool.query(sql.INSERT_REVIEW, [username, review, rating, moviedb_movieid]);
        return { status: 'success', message: 'Review added successfully' };
      } else {
        return { status: 'error', message: 'User already has a review for this movie!' };
      }
      console.log(result); // Log the result of the query if needed

    } catch (error) {
      console.error(error);
    }
}

async function deleteReview(review_id) {
  try {
    const result = await pgPool.query(sql.DELETE_REVIEW, [review_id]);

    if (result.rowCount > 0) {
      return `Review with id=${review_id} was deleted`;
    } else {
      throw new Error(`Review with id=${review_id} not found`);
    }
  } catch (error) {
    return error.message || 'An error occurred while deleting the review';
  }
}



module.exports = {addReview,deleteReview,getReviewsUpgraded};
