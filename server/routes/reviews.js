const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addReview} = require('../models/reviews_model.js');


//add user
router.post('/', upload.none() , async (req,res) => {
    const username = req.body.username;
    const review = req.body.review;
    const rating = req.body.rating;
    const moviedbid = req.body.moviedbid;

    try {
        await addReview(username,review,rating,moviedbid);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }   

});

module.exports = router;
