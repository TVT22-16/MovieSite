const router = require('express').Router();

const {getPopularMovies,searchMovies,getMovieByID, getMovieTrailer, getMoviesUpgraded} = require('../models/movies_model.js');



//new get movies for better filtering and sorting
router.get('/getMovies', async (req, res) => {
    try {
        let release_dategte = req.query.release_dategte;
        let sort_by = req.query.sort_by;
        let vote_averagegte = req.query.vote_averagegte;
        let with_genres = req.query.with_genres;

        let page = req.query.page;
        let vote_countgte = req.query.vote_countgte;

        

        const movies = await getMoviesUpgraded(sort_by, vote_averagegte, with_genres, release_dategte, page, vote_countgte);

        res.json(movies);

    } catch (error) {
        // Use a 500 Internal Server Error status code
        res.status(500).json({ message: error.message });
    }
});


router.get('/search/:page/:search', async(req,res) =>{
    try{
        let search = req.params.search;
        let page = req.params.page;
        const movies = await searchMovies(search,page);
        res.json(movies);
    } catch (error){
        res.json('Movies get fail -> '+ error);
    }
});

router.get('/id/:id', async(req,res) =>{
    try{
        let id = req.params.id;
        const movies = await getMovieByID(id);
        res.status(200).json(movies);
    } catch (error){
        res.status(404).json({error:'Could not find the movie', status:'404'});
        console.error(error);
        

    }
});

router.get('/trailer/:id', async(req,res) =>{
    try{
        let id = req.params.id;
        const movies = await getMovieTrailer(id);
        res.json(movies);
    } catch (error){
        res.json('Movies get fail -> '+ error);
        console.error(error);
    }
});



module.exports = router;

