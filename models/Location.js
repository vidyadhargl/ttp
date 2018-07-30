var mongoose = require('mongoose');
var Scheme = mongoose.Schema;
var locationScheme = new Scheme({
    location: String,
	category: String,
    imageURL: String
});

module.exports = mongoose.model('Location', locationScheme);

