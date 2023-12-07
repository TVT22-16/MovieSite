const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});


const {addToWatchlist, getWatchlistMovies} = require('../models/watchlist_model.js')

router.post('/add', async (req, res) => {
    const { username, moviedb_movieid, title, overview, release_date, poster_path } = req.body;
    console.log(username, moviedb_movieid, title, overview, release_date);
  
    try {
      // Call the function to add to the watchlist
      const result = await addToWatchlist(username, moviedb_movieid, title, overview, release_date, poster_path);
        
      res.status(201).json({
        success: true,
        message: 'Movie added to watchlist successfully!',
        data: result,
      });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
  
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