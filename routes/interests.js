var mongoose = require('mongoose');
var router = require('express').Router();
var Interest = mongoose.model('Interest');

router.post('/postInterest', function(req, res){
  var interest = new Interest({
  	location: req.location,
	email: req.email,
	lat: req.lat,
	lang: req.lang,
	creationDate: req.creationDate,
	status: req.status,
	city: req.city,
	country: req.country});
  

  interest.save(function() {
    return res.send('location saved');
  });
});

router.get('/getInterest', function(req,res){
	Interest.find(
		function(err,response){
			res.send(response)
	})
})

module.exports = router;