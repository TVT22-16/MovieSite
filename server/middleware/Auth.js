const jwtToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwtToken.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;
        if(req.body.username && req.body.username !== username){
            throw 'Invalid username';
    } else {
        next();
    }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};