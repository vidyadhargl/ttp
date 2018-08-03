var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var emailsender = require('./utils/emailsender.js')
    
mongoose.connect("mongodb://localhost:27017/ttp");
require('./models/Interest');
require('./models/Location');
require('./models/AirReco');
require('./models/AirRecosList');
require('./models/CarRecos');
require('./models/HotelRecos');

var interest = require('./routes/interests')
var location = require('./routes/locations')
var recommendations = require('./routes/recommendations')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/interest', interest);
app.use('/location',location);
app.use('/recos',recommendations);

app.get('/',function(req,res){
	res.send('hello TTP')
});

app.listen('4000')