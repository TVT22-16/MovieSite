const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addGroup, getGroups, getGroupbyname, updateGroup, deleteGroup, getGroupsByUser} = require('../models/groups_model');

/**
 * User root get mapping
 */

//get groups
router.get('/', async (req, res) => {
    try {
        const groups = await getGroups();
        res.json(groups);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
});

//get group by name 
router.get('/:group_name', async (req, res) => {
    let group_name = req.params.username; // Access the 'group_name' route parameter
    const groups = await getGroupbyname(group_name);

    if (user.length > 0) {
        res.json(groups);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

router.get('/user/:username', async (req, res) => {
    const username = req.params.username;
  
    try {
      const groups = await getGroupsByUser(username);
  
      if (groups.length === 0) {
        return res.status(404).json({ error: 'User is not part of any groups' });
      }
  
      res.json(groups);
    } catch (error) {
      console.error('Error fetching groups by user:', error);
      res.status(500).json({ error: 'Error fetching groups by user' });
    }
  });

//add group
router.post('/', upload.none() , async (req,res) => {
    const group_name = req.body.group_name;
    const group_description = req.body.group_description;

    try {
        await addGroup(group_name,group_description);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }   

});

// update group
router.put('/:group_name', upload.none(), async (req, res) => {
    let group_name = req.params.group_name;
    let group_description = req.body.group_description;
    try {
        await updateGroup(group_name,group_description);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

//delete user
router.delete('/:group_name', async (req, res) => {
    let group_name = req.params.group_name;
    try {
        await deleteGroup(group_name);
        res.end();
    } catch (error) {
        console.log(error); 
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;