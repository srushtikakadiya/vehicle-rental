const mongoose = require('mongoose');
const Joi = require('joi');

const Car = mongoose.model('cars', new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    dailyRentalFee: {
        type: Number,
        required: true
    }
}))

const schema = {
    brand: Joi.string().required(),
    year: Joi.number().required(),
    fuelType: Joi.string().valid('benzin', 'diesel', 'lpg', 'metan').required(),
    dailyRentalFee: Joi.number().required(),
}

function validate(car) {
    return Joi.validate(car, schema);
}

module.exports.Car = Car;
module.exports.validateCar = validate;