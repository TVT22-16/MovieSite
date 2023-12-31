const pgPool = require('../postgre/connection');

const sql = {
ADD_TO_WATCHLIST: `INSERT INTO watchlist (username, moviedb_movieid, title, overview, release_date, poster_path, added_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *;`,
GET_WATCHLIST_MOVIES: 'SELECT * FROM watchlist WHERE username = $1',
CHECK_IF_MOVIE_IN_WATCHLIST: 'SELECT EXISTS (SELECT 1 FROM watchlist WHERE username = $1 AND moviedb_movieid = $2)',
REMOVE_FROM_WATCHLIST: 'DELETE FROM watchlist WHERE username = $1 AND moviedb_movieid = $2 RETURNING *;',


}


async function addToWatchlist(username, moviedb_movieid, title, overview, release_date, poster_path) {
  try {
    // Additional check for null username
    if (username === null || username === undefined) {
      throw new Error('Username cannot be null');
    }
    if (moviedb_movieid === null || moviedb_movieid === undefined) {
      throw new Error('moviedb_movieid cannot be null');
    }
    if (title === null || title === undefined) {
      throw new Error('Title cannot be null');
    }

    const result = await pgPool.query(sql.ADD_TO_WATCHLIST, [username, moviedb_movieid, title, overview, release_date, poster_path]);
    return result.rows[0]; // Returning the first row of the result (the inserted row)
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

  async function checkIfMovieInWatchlist(username, moviedb_movieid) {
    try {
      if (moviedb_movieid === undefined || moviedb_movieid === null) {
        throw new Error('Invalid moviedb_movieid: ' + moviedb_movieid);
      }
  
      const result = await pgPool.query(sql.CHECK_IF_MOVIE_IN_WATCHLIST, [username, moviedb_movieid]);
      return result.rows[0].exists;
    } catch (error) {
      console.error('Error checking if movie is in watchlist:', error);
      throw error;
    }
  }

  async function removeFromWatchlist(username, moviedb_movieid) {
    try {
      const result = await pgPool.query(sql.REMOVE_FROM_WATCHLIST, [username, moviedb_movieid]);
      return result;
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      throw error;
    }
  }


module.exports = {addToWatchlist, getWatchlistMovies, checkIfMovieInWatchlist, removeFromWatchlist}