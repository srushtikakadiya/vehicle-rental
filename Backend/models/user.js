const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const User = mongoose.model('user', new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 50,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    currentRentals: {
        type: Array
    },
    rentalsHistory: {
        type: Array
    }
}));



function validate(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().min(7).max(20).required(),
        name: Joi.string().min(2).max(255).required(),
    }

    const result = Joi.validate(user.password, new PasswordComplexity({
        min: 7,
        max: 50,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4,
    }));

    if(result.error) {
        return result;
    } else {
        return Joi.validate(user, schema);
    }
}
module.exports.User = User;
module.exports.userValidate = validate;