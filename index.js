var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

var app = express();

app.use(cors());
mongoose.connect("mongodb://localhost:27017/ttp");
app.use(require('./routes'));

app.get('/',function(req,res){
	res.send('hello TTP')
})

app.listen('4000')