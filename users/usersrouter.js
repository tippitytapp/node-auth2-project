const router = require('express').Router();
const Users = require('./usersmodel.js');
const {verifyToken} = require('../auth/authmiddleware.js')

router.use(verifyToken)
router.get('/', (req, res) => {
    const userdept = req.jwt.department
    Users.findDeptById({id: userdept})
        .then(([dept]) => {
            const userDept = dept.name;
            if(userDept === 'admin' || userDept === 'customerserver'){
                Users.findAllUsers()
                .then(users => {
                    res.status(200).json({
                        data: users
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        errorMessage: "failed to retrieve users",
                        error
                    })
                })
            } else {
                Users.findUsersByDepartment(userdept)
                .then(users => {
                    res.status(200).json({
                        data: users
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        errorMessage: "failed to retrieve users",
                        error
                    })
                })
            }


    }).catch(err => {console.log(err)})
})



module.exports = router;