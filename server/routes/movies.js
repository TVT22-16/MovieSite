const router = require('express').Router();

const {getPopularMovies} = require('../models/movies_model.js');



router.get('/', async(req,res) =>{
    try{
        const movies = await getPopularMovies();
        res.json(movies);
    } catch (error){
        res.json('Movies get fail -> '+ error);
    }
});



module.exports = router;

