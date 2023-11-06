
const {addUser, getUsers} = require('../postgre/user');

router.get('/u', async (req, res) => {

    res.json(await getUsers());
   
});
