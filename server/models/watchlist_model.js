const pgPool = require('../postgre/connection');

const sql = {
ADD_TO_WATCHLIST: `INSERT INTO watchlist (username, moviedb_movieid, title, overview, release_date, poster_path, added_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *;`,
GET_WATCHLIST_MOVIES: 'SELECT * FROM watchlist WHERE username = $1',


}

async function addToWatchlist(username, moviedb_movieid, title, overview, release_date, poster_path) {
    try {
      const result = await pgPool.query(sql.ADD_TO_WATCHLIST, [username, moviedb_movieid, title, overview, release_date, poster_path]);
      return result;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      throw error;
    }
  }
  
 async function getWatchlistMovies(username) {
    try {
      const result = await pgPool.query(sql.GET_WATCHLIST_MOVIES, [username]);
      return result.rows;
    } catch (error) {
      console.error('Error getting watchlist movies:', error);
      throw error;
    }
  }


module.exports = {addToWatchlist, getWatchlistMovies}