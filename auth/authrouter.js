const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const {passHash, validate, createToken} = require('./authmiddleware.js');
const {isValid} = require('../server/middleware.js');
const Users = require('../users/usersmodel.js');


router.post('/register', validate, (req, res) => {
    const user = req.body;
    const newUser = passHash(user)
    console.log(newUser)
    Users.add(newUser)
        .then(user => {
            res.status(201).json({
                data: user
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Could not add user at this time, please try again later",
                error
            })
        })
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(isValid(req.body)){
        Users.findUsersBy({username})
            .then(([user]) => {
                console.log([user])
                if(user && bcryptjs.compareSync(password, user.password)){
                    token = createToken(user)
                    res.status(200).json({
                        message: "Logged in successfully",
                        user,
                        token
                    })
                } else {
                    res.status(401).json({
                        message: "Unauthorizd Access Attempted"
                    })
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error,
                    message: error.message
                })
            })
    } else {
        res.status(400).json({
            message: "Please ensure your username and password are valid"
        })
    }
})

module.exports = router;