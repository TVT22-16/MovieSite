const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addUser, getUsers,getUserbyname} = require('../models/altUsers_model');

/**
 * User root get mapping
 */

//get users
router.get('/', async (req, res) => {

     res.json(await getUsers());
    
});

//get user by name 
router.get('/:username',async (req, res)=>{

    let byusr = res.json(await getUserbyname(req.params));

});

//add user
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