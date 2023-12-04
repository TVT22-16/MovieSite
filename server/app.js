var express = require('express');
const dotenv = require('dotenv');
const connection = require('./postgre/connection.js')
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.js');
var groupsRouter = require('./routes/groups.js');
var reviewsRouter = require('./routes/reviews.js');
var moviesRouter = require('./routes/movies.js');
var users_groupsRouter = require('./routes/users_groups.js');
var joinrequestRouter = require('./routes/joinrequest.js')

var app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/groups',groupsRouter);
app.use('/reviews',reviewsRouter);
app.use('/movies',moviesRouter);
app.use('/users_groups',users_groupsRouter);
app.use('/joinrequest',joinrequestRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;