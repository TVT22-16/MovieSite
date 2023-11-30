const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addReview,getReviews,deleteReview,getReviewsUser,getReviewsMovieId,getReviewsUpgraded} = require('../models/reviews_model.js');


//get all reviews or reviews?username=
router.get('/', async (req, res) => {

    try {
        let reviews;
            reviews = await getReviews();
        res.json(reviews);

    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Error fetching reviews" });
    }
});

router.get('/byMovieId/:movieid', async (req, res) => {

    try {
        let id = req.params.movieid;
        let reviews;
        reviews = await getReviewsMovieId(id);

        res.json(reviews);

    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Error fetching reviews" });
    }
});

router.get('/user/:username', async (req, res) => {

    try {
        let username = req.params.username;
        let reviews;
        reviews = await getReviewsUser(username);

        res.json(reviews);

    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Error fetching reviews" });
    }
});


//get Reviews upgraded
router.get('/getReviews', async (req, res) => {
    console.log('Get reviews');

    try {
        let username = req.query.username;
        let movieid = req.query.movieid;

        const response = await getReviewsUpgraded(username,movieid);

        res.json(response);

    } catch (error) {
        // Use a 500 Internal Server Error status code
        res.status(500).json({ message: error.message });
    }
});



//add user
router.post('/add', upload.none() , async (req,res) => {
    const username = req.body.username;
    const review = req.body.review;
    const rating = req.body.rating;
    const moviedb_movieid = req.body.moviedb_movieid;

    console.log(username,review,rating,moviedb_movieid);

    if (rating>10){
        res.json("Rating can't be over 10")
    } else{
        try {
            await addReview(username,review,rating,moviedb_movieid);
            res.end();
        } catch (error) {
            console.log(error);
            res.json({error: error.message}).status(500);
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
