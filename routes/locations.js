//var Location = require('../models/locations');
var mongoose = require('mongoose');
var router = require('express').Router();
var Location = mongoose.model('Location');

router.get('/savelocations',function(req,res) {
	var locations = [
	    new Location({
	        location: 'Bangalore',
	        category: 'IT',
	        imageURL: 'https://www.nightstay.in/last-minute-deals/bangalore'
	    }),
	    new Location({
	        location: 'NICE',
	        category: 'IT',
	        imageURL: 'https://www.nightstay.in/last-minute-deals/bangalore'
	    }),
	    new Location({
	        location: 'PARIS',
	        category: 'IT',
	        imageURL: 'https://www.nightstay.in/last-minute-deals/bangalore'
	    }),
	    new Location({
	        location: 'LONDON',
	        category: 'IT',
	        imageURL: 'https://www.nightstay.in/last-minute-deals/bangalore'
	    }),
	    new Location({
	        location: 'GERMANY',
	        category: 'IT',
	        imageURL: 'https://www.nightstay.in/last-minute-deals/bangalore'
	    })
	];

	var done = 0;
	for(var i=0; i<locations.length; i++){
	    locations[i].save(function(err, result){
	        done++;
	        if(done === locations.length){
	            console.log('added locations to db')
	        }
	    });
	}
})

router.get('/getlocations',function(req,res){
	Location.find(
		function(err,response){
			res.send(response)
		})
})

module.exports = router
