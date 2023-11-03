const { Client } = require('pg');
const dotenv = require('dotenv');

const client = new Client({
  user: 'moviedb_yx6x_user',
  host: 'dpg-cl1l6nrmgg9c73e0v3hg-a.frankfurt-postgres.render.com',
  database: 'moviedb_yx6x',
  password: 'NVH9CDO5pHozZzRic1xovtOOePcqqB6V',
  port: 5432, // Default PostgreSQL port
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
