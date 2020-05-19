const router = require('express').Router();
const Users = require('./usersmodel.js');
const {verifyToken} = require('../auth/authmiddleware.js')

router.use(verifyToken)
router.get('/', (req, res) => {
    Users.findAllUsers()
        .then(users => {
            res.status(200).json({
                data: users
            })
        })
})



module.exports = router;