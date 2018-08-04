//var Location = require('../models/locations');
var mongoose = require('mongoose');
var router = require('express').Router();
var LocationCount = mongoose.model('LocationCount');
var Interest = mongoose.model('Interest');
var locationName;

router.get('/getlocationscount',function(req,res){
	Interest.aggregate([
        {
            "$group": {
                "_id": "$destination.city",
                "count": { "$sum": 1 }
            }
        }
    ], function (err, result) {
        console.log(result);
        res.json(result);
    });
});
module.exports = router
