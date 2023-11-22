const router = require('express').Router();

const {getPopularMovies,searchMovies,getMovieByID} = require('../models/movies_model.js');



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



module.exports = router;

