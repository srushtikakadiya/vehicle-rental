const mongoose = require('mongoose');

function dbConection() {
     mongoose.connect('mongodb+srv://srushti:<password>@cluster0.7dbtb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to rentalServices database...'))
    .catch((err) => {
        console.log(err.message); 
        process.exit(1);
    });
}

module.exports = dbConection;  