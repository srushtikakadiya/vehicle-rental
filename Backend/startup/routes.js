const express = require('express');
const cors = require('cors');
const car = require('../routers/car-router');
const user = require('../routers/user-router');
const rental = require('../routers/rental-router');

function routes(app) {
    app.use(cors());
    app.use(express.json());
    app.use('/cars', car);
    app.use('/user', user);
    app.use('/rental', rental);
}

module.exports = routes;