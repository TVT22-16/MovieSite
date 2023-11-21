const router = require('express').Router();

const {getPopularMovies,searchMovies,getMovieByID} = require('../models/movies_model.js');



router.get('/:filter', async(req,res) =>{
    try{
        let filter = req.params.filter;

        const movies = await getPopularMovies(filter,1);

        res.json(movies);
    } catch (error){
        res.json('Movies get fail -> '+ error);
    }
});

router.get('/search/:search', async(req,res) =>{
    try{
        let search = req.params.search;
        const movies = await searchMovies(search);
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
    }
});



module.exports = router;

