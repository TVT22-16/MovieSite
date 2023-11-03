const db = require('../db');

const users = {
    getAll: function(callback){
        return db.query('select username, password from users', callback);
    },
    getById: function(id, callback){
        return db.query('select username, password from users where idusers = $1', [id], callback);
    },
    add: function(users, callback){
        return db.query('insert into users (username, password) values ($1, $2)', [users.username, users.password], callback);
    },    
    delete: function(username, callback) {
        return db.query('DELETE FROM users WHERE username = $1', [username], callback);
    },    
    update: function(username, userData, callback) {
        return db.query('UPDATE users SET username = $1, password = $2 WHERE username = $3', [userData.username, userData.password, username], callback);
    },
    
    
};

module.exports = users;
