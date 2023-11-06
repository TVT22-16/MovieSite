var express = require('express');
// const pool = require('./db');
const dotenv = require('dotenv');
const connection = require('./postgre/connection.js')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//alternative
var altUserRouter = require('./routes/altUsers.js')

var app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Alternative
app.use('/altUsers',altUserRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;