const pgPool = require('../postgre/connection');

const sql = {
    INSERT_REVIEW: 'INSERT INTO reviews VALUES ($1, $2, $3, $4)',

};


async function addReview(username,rating,review,moviedbid) {
    try {
        const result = await pgPool.query(sql.INSERT_REVIEW, [username, rating, review, moviedbid]);
        console.log(result); // Log the result of the query if needed
    } catch (error) {
        console.error(error);
    }
}


module.exports = {addReview};
