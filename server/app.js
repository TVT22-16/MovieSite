var express = require('express');
const pool = require('./db');
const dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;