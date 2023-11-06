

const pgPool = require('../postgre/connection');

const sql = {
    INSERT_USER: 'INSERT INTO users VALUES ($1, $2)',
    GET_USERS: 'SELECT username,password FROM users'
};




async function addUser(username,password){
    await pgPool.query(sql.INSERT_USER, [username,password]);
}

async function getUsers(){
    const result = await pgPool.query(sql.GET_USERS);
    const rows = result.rows;
    return rows;
}

module.exports = {addUser, getUsers};