var mongoose = require('mongoose');
// var AirRecosList = mongoose.model('AirRecosList');
// var CarRecosList = mongoose.model('CarRecos');
// var HotelRecosList = mongoose.model('HotelRecos');


var RecosSchema = new mongoose.Schema({
    id: String,
    AirRecos : {},
    HotelRecos : {} 
});


module.exports = mongoose.model('Recos', RecosSchema);