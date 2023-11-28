const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {addUserGroup,getUserGroup,getGroupMembers,updateUserGroup,deleteUserGroup,getReviewsForGroup} = require('../models/users_groups_model');

//get users_groups
router.get('/', async (req, res) => {
    try {
        const users = await getUserGroup();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
});
//get Group members
router.get('/:group_name', async (req, res) => {
    const group_name = req.params.group_name; // Extract group_name from request parameters
    try {
        const users = await getGroupMembers(group_name); // Pass group_name to the function
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);S
        res.status(500).json({ error: "Error fetching users" });
    }
});

//add users_groups
router.post('/', upload.none() , async (req,res) => {
    const username = req.body.username;
    const group_name = req.body.group_name;
    const admin = req.body.admin;

    try {
        await addUserGroup(username,group_name,admin);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }   
});
router.get('/reviewforgroup/:group_name', async (req, res) => {
    const group_name = req.params.group_name; // Extract group_name from request parameters
    try {
        const users = await getReviewsForGroup(group_name); // Pass group_name to the function
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);S
        res.status(500).json({ error: "Error fetching users" });
    }
});

module.exports = router;