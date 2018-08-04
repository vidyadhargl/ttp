var mongoose = require('mongoose');

var InterestSchema = new mongoose.Schema({
	source: Object,
	destination: Object,
	pax: Object,
	email: String,
	fromDate: String,
	toDate: String,
	status: Number
});


module.exports = mongoose.model('Interest', InterestSchema);
