var mongoose = require('mongoose');

var CarRecoListSchema = new mongoose.Schema({
	car : {}
});


module.exports = mongoose.model('CarRecos', CarRecoListSchema);