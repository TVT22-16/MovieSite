

const pgPool = require('../postgre/connection');

const sql = {
    INSERT_USER: 'INSERT INTO users VALUES ($1, $2)',
    GET_USERS: 'SELECT username,password FROM users',
    GET_USERBYNAME: 'SELECT * FROM users WHERE username = $1'
};


async function addUser(username,password){
    await pgPool.query(sql.INSERT_USER, [username,password]);
    console.log(sql.INSERT_USER, [username,password]);
}

async function getUsers(){
    const result = await pgPool.query(sql.GET_USERS);
    const rows = result.rows;
    return rows;
}

async function getUserbyname(username){
    const result = await pgPool.query(sql.GET_USERBYNAME,[username]);
    console.log(sql.GET_USERBYNAME,[username]);
    console.log(username);
    const rows = result.rows;
    console.log(rows);
    return rows;
}

module.exports = {addUser, getUsers,getUserbyname};