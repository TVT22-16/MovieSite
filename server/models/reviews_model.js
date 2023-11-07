const pgPool = require('../postgre/connection');

const sql = {
    GET_REVIEWS: 'SELECT * FROM reviews',
    INSERT_REVIEW: 'INSERT INTO reviews VALUES ($1, $2, $3, $4, NOW())',

};

async function getReviews(){
    const result = await pgPool.query(sql.GET_REVIEWS);
    const rows = result.rows;
    return rows;
}

async function addReview(username,rating,review,moviedbid) {
    try {
        const result = await pgPool.query(sql.INSERT_REVIEW, [username, review, rating, moviedb_movieid]);
        console.log(result); // Log the result of the query if needed
    } catch (error) {
        console.error(error);
    }
}


module.exports = {addReview,getReviews};
