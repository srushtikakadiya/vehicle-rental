const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {auth} = require('../middleware/auth');
const {User, userValidate} = require('../models/user');
const {Rental} = require("../models/rental");


router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        })
})
router.get('/profile', auth,  (req, res) => {
    User.findById(req.user._id)
        .then(user => {
            Rental.find()
                .then(rentals => {
                    const resRentals = [];
                    rentals.forEach(rental => {
                        user.currentRentals.forEach(id => {
                            if((rental._id.toString()) === (id.toString())) {
                                resRentals.push(rental)
                            }
                        })
                    })
                    res.send(resRentals);
                })
                .catch((err) => res.status(404).send(err.message));
        })
        .catch((err) => res.status(404).send(err.message));
})
router.post('/register', (req, res) => {
    const {error} = userValidate(req.body);
    if(error) return res.status(400).json({status: 400, error: error});

    User.findOne({email: req.body.email})
        .then((user) => {
            if(user) return res.status(400).send('The email is already in use!');

            const newUser = new User({...req.body});
            bcrypt.genSalt(10)
                .then((salt) => {
                    bcrypt.hash(newUser.password, salt)
                        .then((pass) => {
                            newUser.password = pass;
                            newUser.save()
                            .then((user) => res.send(`${user.name}\`s registration is successful!`))
                            .catch((err) => res.status(404).send(err.message));
                        })
                        .catch((err) => res.status(404).send(err.message));
                })
                .catch((err) => res.status(404).send(err.message));
        })
        .catch((err) => res.status(404).send(err.message));
})
router.post('/logout', auth, (req, res) => {
    User.findById(req.user._id)
        .then(user => {
            user.isLoggedIn = false;
            user.save()
                .then((user)=>{
                    res.send(`${user.name} has loggout!`)
                })
                .catch((err) => res.status(404).send(err.message));
        })
        .catch((err) => res.status(404).send(err.message));
})
router.post('/login', (req, res) => {
    
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) return res.status(400).send('Unavailable username or password!');

            bcrypt.compare(req.body.password, user.password)
                .then((bool) => {
                    if(!bool) return res.status(400).send('Unavailable username or password!');
                    user.isLoggedIn = true;
                    user.save()
                        .then((user) => {
                            const token = jwt.sign(_.pick(user,['name', 'phoneNumber', 'email', '_id', 'isAdmin']), process.env.JWTKEY);
                            res.header('x-auth-token', token).header("access-control-expose-headers", "x-auth-token").send(`User ${user.name} logged in successfully!`);
                        })
                        .catch((err) => res.status(404).send(err.message));
                    
                })
                .catch((err) => res.status(404).send(err.message));
        })
        .catch((err) => res.status(404).send(err.message));
})

module.exports = router;