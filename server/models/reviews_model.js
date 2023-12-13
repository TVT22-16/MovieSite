const pgPool = require('../postgre/connection');

const sql = {
    GET_REVIEWS_USER: 'SELECT * FROM reviews WHERE username=$1',
    GET_REVIEWS_MOVIEDB_MOVIEID: 'SELECT * FROM reviews WHERE moviedb_movieid=$1',
    INSERT_REVIEW: 'INSERT INTO reviews (username, review, rating, moviedb_movieid,created_at) VALUES ($1,$2,$3,$4, NOW())',
    DELETE_REVIEW: 'DELETE FROM reviews WHERE review_id=$1;',

    USER_EXISTS: 'SELECT * FROM users WHERE username=$1',
    
    GET_REVIEWS: 'SELECT * FROM reviews ORDER BY created_at DESC',
    GET_REV_USER: 'SELECT * FROM reviews WHERE username=$1 ORDER BY created_at DESC',
    GET_REV_USERMOVIE: 'SELECT * FROM reviews WHERE username=$1 AND moviedb_movieid=$2 ORDER BY created_at DESC',
    GET_REV_MOVIE: 'SELECT * FROM reviews WHERE moviedb_movieid=$1 ORDER BY created_at DESC'
};

const sqlWithReturning = {
  INSERT_REVIEW_WITH_RETURNING: `${sql.INSERT_REVIEW} RETURNING *`, // '*' returns all columns; modify as needed
};


async function getReviewsUpgraded(username=null, movieid=null) {
  let result;

  if (!username && !movieid) {
    result = await pgPool.query(sql.GET_REVIEWS);
  } else if (username && !movieid) {
    result = await pgPool.query(sql.GET_REV_USER, [username]);
  } else if (!username && movieid) {
    result = await pgPool.query(sql.GET_REV_MOVIE, [movieid]);
  } else {
    result = await pgPool.query(sql.GET_REV_USERMOVIE, [username, movieid]);
  }

  const rows = result.rows;

  // Sort the rows by created_at in descending order (newest to oldest)
  // const sortedRows = rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return rows;
}

async function addReview(username, review, rating, moviedb_movieid) {


  try {
    const userExitsResponse = await pgPool.query(sql.USER_EXISTS,[username]);

    if(userExitsResponse.rowCount > 0){

      const response = await pgPool.query(sql.GET_REV_USERMOVIE, [username, moviedb_movieid]);

      if (response.rowCount < 1) {
        const result = await pgPool.query(
          sqlWithReturning.INSERT_REVIEW_WITH_RETURNING,
          [username, review, rating, moviedb_movieid]
        );

        if (result.rowCount > 0) {
          const affectedRow = result.rows[0];
          return { status: 200, message: 'Review added successfully', review: affectedRow };
        } else {
          return { status: 400 , message: 'Review not added' };
        }
      } else {
        return { status: 403, message: 'User already has a review for this movie!' };
      }

    } else{
      return {status: 404, message:'User does not exist'};
    }
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'An error occurred' };
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
