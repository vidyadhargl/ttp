var mongoose = require('mongoose');
var router = require('express').Router();
var Interest = mongoose.model('Interest');

router.post('/postInterest', function(req, res){
	console.log(req.body);
  var interest = new Interest(req.body);

  interest.save(function() {
    return res.send(JSON.stringify('location saved'));
  });
});

router.get('/getInterest', function(req,res){
	Interest.find(
		function(err,response){
			console.log(response);
			return res.send(JSON.stringify(response));
	})
})

module.exports = router;