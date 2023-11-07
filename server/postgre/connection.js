require('dotenv').config({path:('../.env')});
const {Pool} = require('pg');

//this is alternative for db.js

const pgPool = new Pool({
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: true
});

pgPool.connect((err) => {
    if(err){
        console.log(err.message);
    }
});

module.exports = pgPool;