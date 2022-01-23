const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { Rental, validateRental } = require("../models/rental");
const { Car } = require("../models/cars");
const { User } = require('../models/user');



router.post('/',auth, (req, res) => {
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.message);
    const {carId, rentalDays} = req.body;
    Car.findById(carId)
        .then((car) => {
            if(!car.isAvailable) return res.status(400).send('Selected car is not available');

            User.findById(req.user._id)
                .then(user => {
                    const newRental = new Rental({
                        rentalDays: rentalDays,
                        rentalFee: rentalDays*car.dailyRentalFee,
                        renter: {
                            name: user.name,
                            phone: user.phoneNumber
                        },
                        rentedCar: {
                            brand: car.brand,
                            id: car._id
                        }
                    })

                    newRental.save()
                        .then((rental)=> {
                            car.isAvailable = false;
                            car.save()
                                .then(() => {
                                    user.currentRentals.push(rental._id)
                                    user.save()
                                        .then(()=> {
                                            res.send('Thank you for renting car from us! We hope you`ll have wonderfull ride!')
                                        })
                                        .catch(err => res.status(400).send(err.message))
                                })
                                .catch(err => res.status(400).send(err.message))

                        })
                        .catch(err => res.status(400).send(err.message))

                })
                .catch(err => res.status(400).send(err.message))

        })
        .catch(err => res.status(400).send(err.message))

})

module.exports = router;