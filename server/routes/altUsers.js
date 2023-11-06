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
    const fname = req.body.fname;
    const lname = req.body.lname;
    const uname = req.body.uname;
    let pw = req.body.pw;

    pw = await bcrypt.hash(pw, 10);

    console.log(pw);

    try {
        await addUser(fname,lname,uname,pw);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
    

});

module.exports = router;