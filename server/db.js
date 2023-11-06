const { Client } = require('pg');
const dotenv = require('dotenv');
require('dotenv').config();

const dbUser = process.env.USER;
const dbHost = process.env.HOST;
const dbPassword = process.env.PASSWORD;
const db = process.env.DATABASE;
const dbPORT = process.env.DBPORT;


const client = new Client({
  user: dbUser,
  host: dbHost,
  database: db,
  password: dbPassword,
  port: dbPORT, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
    .then(() => { console.log('Connected to database!');
})
    .catch(err => { console.log('Error connecting to database: ', err);
});
module.exports = client;
