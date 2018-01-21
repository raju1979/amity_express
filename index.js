const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan');
var cors = require('cors');

var user_data = require('./dump/user_data.json');

require('dotenv').config();

mongoose.Promise = global.Promise;


const app = express();

app.use(cors());
app.use(morgan('dev'));

//configure app for body-bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// const userRoute = require('./routes/userRoute');

app.use('/api/user',require('./routes/user'));

const PORT = process.env.PORT || 5001;

const mongoosePromise = mongoose.connect(process.env.DB_HOST);
mongoosePromise.then(() => {
  console.log('connected');

  app.listen(PORT,function(){
    console.log(`App running on PORT ${PORT}`)
  });

})

app.get('/',(req,res) => {
  res.send(user_data);
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
