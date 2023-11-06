const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addUser, getUsers} = require('../models/altUsers_model');

/**
 * User root get mapping
 */
router.get('/', async (req, res) => {

     res.json(await getUsers());
    
});


//User root post mapping. Supports urlencoded and multer
router.post('/', upload.none() , async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;


    try {
        await addUser(username,password);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
    

});

module.exports = router;