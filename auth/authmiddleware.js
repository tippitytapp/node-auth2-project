const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
const bcryptjs = require('bcryptjs');



// check to make sure new user info is valid before registering
const validate = (req, res, next) => {
    const user = req.body;
    if(!user){
        res.status(400).json({
            message: "missing user information"
        })
    } else if (!user.name){
        res.status(400).json({
            message: "Please provide a name for the user"
        })
    } else if(!user.username){
        res.status(400).json({
            message: "Please provide a username for the user"
        })
    } else if (!user.password || typeof user.password !== 'string' || user.password.length < 8){
        res.status(400).json({
            message: "Please provide a valid password for the user"
        })
    } else {
        next();
    }
}


// hashing password on register

function passHash(info){
    const user = info;
    const hash = bcryptjs.hashSync(user.password, 12);
    user.password = hash;
    return user;
}

// Create a token during login

function createToken(user){
    const payload = {
        sub: user.id,
        name: user.name,
        username: user.username,
        department: user.department
    };
    const options = {
        expiresIn: '24h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}


// create token when loggin in

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secrets.jwtSecret, (err, decToken) => {
            if(err){
                res.status(401).json({
                        message: "Invalid Authorization Received"
                })
            } else {
                req.jwt = decToken;
                next();
            }
        })
    } else {
        res.status(401).json({
            message: "Please provide the correct authorization"
        })
    }
}

module.exports = {passHash, createToken, verifyToken, validate}