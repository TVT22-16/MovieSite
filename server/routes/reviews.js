const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addReview,getReviews} = require('../models/reviews_model.js');



router.get('/', async (req, res) => {
    try {
        const reviews = await getReviews();
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
});


//add user
router.post('/add', upload.none() , async (req,res) => {
    const username = req.body.username;
    const review = req.body.review;
    const rating = req.body.rating;
    const moviedbid = req.body.moviedb_movieid;

    try {
        await addReview(username,review,rating,moviedbid);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }   

});

module.exports = router;
