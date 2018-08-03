var mongoose = require('mongoose');

var AirRecoSchema = new mongoose.Schema({
	origin: String,
	destination: String,
	departureDate: String,
	arrivalDate: String
	
});


module.exports = mongoose.model('AirReco', AirRecoSchema);