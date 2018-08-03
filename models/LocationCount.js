var mongoose = require('mongoose');
var Scheme = mongoose.Schema;
var locationCountScheme = new Scheme({
    locationCount: Number
});

module.exports = mongoose.model('LocationCount', locationCountScheme);

