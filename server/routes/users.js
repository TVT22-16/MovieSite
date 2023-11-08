const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {addUser, getUsers, getUserbyname, updateUser, deleteUser, checkUser} = require('../models/users_model');

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

//add user
router.post('/register', upload.none() , async (req,res) => {
    const username = req.body.username;
    let password = req.body.password;

    password = await bcrypt.hash(password, 10);
    try {
        await addUser(username,password);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }

});

router.post('/login', upload.none(), async (req,res) => {
    const username = req.body.username;
    let password = req.body.password;

    const pwHash = await checkUser(username);

    if(pwHash){
        const isCorrect = await bcrypt.compare(password, pwHash);
        if(isCorrect){
            const token = jwt.sign({username: username}, process.env.JWT_SECRET);
            res.status(200).json({jwtToken:token});
        }else{
            res.status(401).json({error: 'Invalid password'});
        }
    }else{
        res.status(401).json({error: 'Customer not found'});
    }
});

router.get('/private', async (req,res) => {
    //Authorization: Bearer token
    const token = req.headers.authorization?.split(' ')[1];
    console.log('privatessa');
    try {
        const username = jwt.verify(token, process.env.JWT_SECRET).username;
        res.status(200).json({private: 'This is private for ' + username});
        console.log('toimii');
    } catch (error) {
        res.status(403).json({error: 'Access forbidden'});
        console.log('ei toimi');
    }
});

// update user
router.put('/:username', upload.none(), async (req, res) => {
    let username = req.params.username;
    let password = req.body.password;
    try {
        await updateUser(username,password);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

//delete user
router.delete('/:username', async (req, res) => {
    let username = req.params.username;
    try {
        await deleteUser(username);
        res.end();
    } catch (error) {
        console.log(error); 
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;