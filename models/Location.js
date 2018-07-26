var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
	location: String,
	category: String,
	imageURL: String
});

mongoose.model('Location', LocationSchema);