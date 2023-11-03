const express = require('express');
const router = express.Router();
const users = require('../models/users_model');

router.get('/', function(request, response) {
    users.getAll(function(err, dbResult) {
        if (err) {
            response.json(err);
        } else {
            const usersData = dbResult.rows.map(row => {
                const { username, password } = row;
                return { username, password };
            });
            response.json(usersData);
        }
    });
});

router.get('/:id', function(request, response){
    users.getById(request.params.id, function(err, dbResult){
        if(err){
           response.json(err);
        }
        else{
            response.json(dbResult[0]);
        }
    })
});

router.post('/', function(request, response){
    users.add(request.body, function(err, dbResult){
        if(err){
           response.json(err);
        }
        else{
            response.json(dbResult[0]);
        }
    })
});

router.delete('/:username', function(request, response){
    const username = request.params.username; // Get the unique username from the URL

    users.delete(username, function(err, dbResult){
        if(err){
            response.json(err);
        } else {
            response.json({ message: 'User deleted successfully' });
        }
    });
});

router.put('/:username', function(request, response){
    const username = request.params.username; // Get the unique username from the URL
    const userData = request.body; // Assuming the request body contains the updated user data

    users.update(username, userData, function(err, dbResult){
        if(err){
            response.json(err);
        } else {
            response.json(dbResult[0]);
        }
    });
});

module.exports = router;