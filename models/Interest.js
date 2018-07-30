var mongoose = require('mongoose');

var InterestSchema = new mongoose.Schema({
	location: String,
	email: String,
	lat: String,
	lang: String,
	creationDate: String,
	status: Number,
	city: String,
	country: String
});


module.exports = mongoose.model('Interest', InterestSchema);
