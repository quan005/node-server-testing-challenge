const express = require('express');

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const router = express.Router();


//Get Restricted users
router.get('/', restricted, (req, res) => {

    // console.log('decoded', req.decodedToken);
    const {userId, department} = req.decodedToken;

    if(department == 'admin') {
        Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.status(500).send(err));
    } else {
        Users.findById(userId)
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(500).send(err));
    }
});

module.exports = router;