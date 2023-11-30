const pgPool = require('../postgre/connection');

const sql = {
    INSERT_USER: 'INSERT INTO users VALUES ($1, $2, $3)',
    GET_USERS: 'SELECT username,password,avatar FROM users',
    GET_USERNAMES: 'SELECT username FROM users',
    GET_USERBYNAME: 'SELECT * FROM users WHERE username = $1',
    UPDATE_USER: 'UPDATE users SET username = $1, password = $2, avatar = $3 WHERE username = $1',
    UPDATE_USERNAME: 'UPDATE users SET username = $1, password = $2 WHERE username = $3',
    UPDATE_USER_AVATAR: 'UPDATE users SET avatar = $2 WHERE username = $1',
    DELETE_USER: 'DELETE FROM users WHERE username = $1',
    GET_PW: 'SELECT password FROM users WHERE username = $1'
};


async function addUser(username,password,avatar){
    await pgPool.query(sql.INSERT_USER, [username,password,avatar]);
}
async function getUsers(){
    const result = await pgPool.query(sql.GET_USERS);
    const rows = result.rows;
    return rows;
}
async function getUsernames(){
    const result = await pgPool.query(sql.GET_USERNAMES);
    const rows = result.rows;
    return rows;
}
async function getUserbyname(username){
    const result = await pgPool.query(sql.GET_USERBYNAME,[username]);
    const rows = result.rows;
    return rows;
}
async function updateUser(username,password,avatar){
    await pgPool.query(sql.UPDATE_USER, [username,password,avatar]);
    console.log(sql.UPDATE_USER, [username,password,avatar]);
}
async function updateUsername(username, password, newUsername) {
    await pgPool.query(sql.UPDATE_USERNAME, [newUsername, password, username]);
    console.log(sql.UPDATE_USERNAME, [newUsername, password, username]);
}
async function updateUserAvatar(avatar, username) {
    await pgPool.query(sql.UPDATE_USER_AVATAR, [avatar, username]);
    console.log(sql.UPDATE_USER_AVATAR, [avatar, username]);
}
async function deleteUser(username){
    await pgPool.query(sql.DELETE_USER, [username]);
    console.log(sql.DELETE_USER, [username]);
}

async function checkUser(username){
        const result = await pgPool.query(sql.GET_PW, [username]);

        if(result.rows.length > 0){
            return result.rows[0].password;
        }else{
            return null;
        }
}
module.exports = {addUser, getUsers,getUsernames,getUserbyname ,updateUser, updateUsername, updateUserAvatar, deleteUser, checkUser};