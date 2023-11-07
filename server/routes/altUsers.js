const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addUser, getUsers,getUserbyname} = require('../models/altUsers_model');

/**
 * User root get mapping
 */

//get users
router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
});

//get user by name 
router.get('/:username', async (req, res) => {
    let username = req.params.username; // Access the 'username' route parameter
    const user = await getUserbyname(username);

    if (user.length > 0) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
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