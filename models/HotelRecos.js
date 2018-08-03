var mongoose = require('mongoose');

var HotelRecoListSchema = new mongoose.Schema({
	hotel : {}
});


module.exports = mongoose.model('HotelRecos', HotelRecoListSchema);