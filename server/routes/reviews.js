const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addReview,deleteReview,getReviewsUpgraded} = require('../models/reviews_model.js');

//get Reviews 
router.get('/getReviews', async (req, res) => {
    console.log('Get reviews');

    try {
        let username = req.query.username;
        let movieid = req.query.movieid;

        const response = await getReviewsUpgraded(username, movieid);

        if (response.length > 0) {
            res.status(200).json({ results: response });
        } else {
            // Use 204 No Content status code for empty array
            res.status(204).send();
        }
    } catch (error) {
        // Use a 500 Internal Server Error status code
        res.status(500).json({ message: error.message });
    }
});


//add review
router.post('/add', upload.none() , async (req,res) => {
    const username = req.body.username;
    const review = req.body.review;
    const rating = req.body.rating;
    const moviedb_movieid = req.body.moviedb_movieid;

    console.log(username,review,rating,moviedb_movieid);

    if (rating>10){
        res.status(400).json("Rating can't be over 10");
    } else{
        try {
            const response  = await addReview(username,review,rating,moviedb_movieid);
            res.status(response.status).json(response);
            res.end();
        } catch (error) {
            res.status(503).json(response);
            res.end();
        }  
    }
});

//delete review by id
router.delete('/delete/:review_id', async(req,res) => {

    try{
        const review_id = req.params.review_id;
        res.json(await deleteReview(review_id));
        res.end();
    } catch (error){
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;
