var mongoose = require('mongoose');

var AirRecoListSchema = new mongoose.Schema({
	air : {}
});


module.exports = mongoose.model('AirRecosList', AirRecoListSchema);