const express = require('express');
const app = express();

require('dotenv').config();
require('./startup/database-connenction')();
require('./startup/routes')(app);

app.get('/', (req, res) => {
    res.send('Hello to rentAcar services!')
})

const PORT = process.env.PORT || 9000 ;
app.listen(PORT, ()=> {
    console.log(`Rentals lestening on port ${PORT}...`)
});