const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});


const {addToWatchlist, getWatchlistMovies, checkIfMovieInWatchlist} = require('../models/watchlist_model.js')

router.post('/add', async (req, res) => {
  try {
    const { username, moviedb_movieid } = req.body;
    // Check if the movie is already in the watchlist for the user
    const isMovieInWatchlist = await checkIfMovieInWatchlist(username, moviedb_movieid);

    if (isMovieInWatchlist) {
      return res.status(400).json({ success: false, error: 'Movie is already in the watchlist.' });
    }

    // Movie is not in the watchlist, proceed with adding
    const result = await addToWatchlist(req.body.username, req.body.moviedb_movieid, req.body.title, req.body.overview, req.body.release_date, req.body.poster_path);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.get('/check/:username/:moviedb_movieid', async (req, res) => {
  try {
    const { username, moviedb_movieid } = req.params;

    // Call the function to check if the movie is in the watchlist
    const isMovieInWatchlist = await checkIfMovieInWatchlist(username, moviedb_movieid);

    res.status(200).json({
      success: true,
      data: {
        isMovieInWatchlist,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
});
  
  router.get('/:username', async (req, res) => {
    const { username } = req.params;
  
    try {
      // Call the function to get watchlist movies for the user
      const watchlistMovies = await getWatchlistMovies(username);
  
      res.status(200).json({
        success: true,
        data: watchlistMovies,
      });
    } catch (error) {
      console.error('Error getting watchlist movies:', error);
  
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  });

module.exports = router;