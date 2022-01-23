const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { auth } = require("../middleware/auth");
const { Car, validateCar } = require("../models/cars");
const cars = require("../carsArr");

function populateCarsDB() {
  Car.deleteMany({}).then(() => {
    cars.forEach(car => {
      let newCar = new Car(car);
      newCar.save();
    });
  });
}
populateCarsDB();

router.get("/", (req, res) => {
  Car.find()
    .then(cars => {
      res.send(cars);
    })
    .catch(err => res.send(err));
});
router.get("/:id", (req, res) => {
  Car.findById(req.params.id)
    .then(car => res.send(car))
    .catch(err => res.status(404).send(err.message));
});
router.post("/", auth, (req, res) => {
  const { error } = validateCar(req.body);
  if (error) return res.status(400).send(error);
  // if(!req.user.isAdmin) return res.status(403).send('Access denied, only admins can add cars!');
  const newCar = new Car({ ...req.body });
  newCar
    .save()
    .then(car => res.send("Car saved to DB"))
    .catch(err => res.send(err));
});
module.exports = router;
