var mongoose = require('mongoose');

var InterestSchema = new mongoose.Schema({
	location: String,
	email: String,
	lat: String,
	lng: String,
	createDate: String,
	status: Number,
	city: String,
	country: String
});


module.exports = mongoose.model('Interest', InterestSchema);
