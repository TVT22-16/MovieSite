
const {addUser, getUsers, getByusername} = require('../postgre/user');

router.get('/u', async (req, res) => {

    res.json(await getUsers());
   
});

router.get('/u/:username', async (req, res) => {
    let username = req.params.username;
    console.log('Received request for username:', username);

    try {
        const user = await getByusername(username);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/u', upload.none() , async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(pw);

    try {
        await addUser(username,password);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
    

});
