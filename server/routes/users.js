const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/Auth.js');

const {addUser, getUsers, getUsernames, getUserbyname, updateUser,updateUserAvatar, deleteUser, checkUser, updateUsername} = require('../models/users_model');

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
router.get('/userinfo', async (req, res) => {
    try {
        const users = await getUsernames();
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
    const avatar = req.body.avatar;

    password = await bcrypt.hash(password, 10);
    try {
        await addUser(username,password,avatar);
        res.end();
    } catch (error) {
        if (error.message.includes('duplicate key value violates unique constraint')) {
            // Check the error message for a specific string indicating a unique constraint violation
            res.status(409).json({ error: 'Username already exists' });
          } else {
            // Send a generic error message for other cases
            res.status(500).json({ error: 'Internal Server Error' });
          }
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
        res.status(401).json({error: 'User not found'});
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

router.get('/private2', async (req,res) => {
    //Authorization: Bearer token
    const token = req.headers.authorization?.split(' ')[1];
    console.log('privatessa');
    try {
        const username = jwt.verify(token, process.env.JWT_SECRET).username;
        res.status(200).json({username : username});
        console.log('toimii');
    } catch (error) {
        res.status(403).json({error: 'Access forbidden'});
        console.log('ei toimi');
    }
});

// update user
router.put('/user/:username', upload.none(), async (req, res) => {
    let username = req.params.username;
    let password = req.body.password;
    let avatar = req.body.avatar;

    password = await bcrypt.hash(password, 10);
    try {
        await updateUser(username,password,avatar);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});
//update users avatar
router.put('/avatar/:username', upload.none(), async (req, res) => {
    let username = req.params.username;
    let avatar = req.body.avatar;

    try {
        await updateUserAvatar(username,avatar);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});
//update username
router.put('/name/:username', upload.none(), async (req, res) => {
    let username = req.params.username;
    let password = req.body.password;
    let newUsername = req.body.newUsername;

    password = await bcrypt.hash(password, 10);
    try {
        await updateUsername(username,password, newUsername);
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