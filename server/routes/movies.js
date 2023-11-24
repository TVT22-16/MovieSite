const router = require('express').Router();

const {getPopularMovies,searchMovies,getMovieByID, getMovieTrailer, getMoviesUpgraded} = require('../models/movies_model.js');



router.get('/filters/:page/:filter', async(req,res) =>{
    try{
        let filter = req.params.filter;
        let page = req.params.page;

        const movies = await getPopularMovies(filter,page);

        res.json(movies);
    } catch (error){
        res.json('Movies get fail -> '+ error);
    }
});

//new get movies for better filtering and sorting
router.get('/getMovies/', async (req, res) => {
    try {
        let release_dategte = req.body.release_dategte;
        let sort_by = req.body.sort_by;
        let vote_averagegte = req.body.vote_averagegte;
        let with_genres = req.body.with_genres;

        let page = req.body.page;

        const movies = await getMoviesUpgraded(sort_by,vote_averagegte,with_genres,release_dategte, page);

        res.json(movies);

    } catch (error) {
        // Use a 500 Internal Server Error status code
        res.status(500).json({message: error.message });
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
        res.json(movies);
    } catch (error){
        res.json('Movies get fail -> '+ error);
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

