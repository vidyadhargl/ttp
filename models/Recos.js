var mongoose = require('mongoose');
var AirRecosList = mongoose.model('AirRecosList');
var CarRecosList = mongoose.model('CarRecos');
var HotelRecosList = mongoose.model('HotelRecos');


var RecosSchema = new mongoose.Schema({
    id: string,
    AirRecos : AirRecosList,
    CarRecos  : CarRecosList,
    HotelRecos : HotelRecosList 
});


module.exports = mongoose.model('Recos', RecosSchema);