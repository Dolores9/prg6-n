const express = require ('express');
const bodyParser = require('body-parser');

const app = express ();

// create application/json parser
var jsonParser = bodyParser.json(({ type : 'application/json'}))

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser);
app.use(urlencodedParser);

// Import the mongoose module
const mongoose = require("mongoose");

//load environment variables
require("dotenv").config();
console.log("het werkt");

//test
console.log(process.env.BASE_URI);

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/games";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


const gamesRoutes = require("./routes/gameRoutes");

app.use('/games', gamesRoutes );

app.listen(8000, () => {
   console.log("its starting")
});



