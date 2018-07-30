var mongoose = require('mongoose');
var router = require('express').Router();
var Interest = mongoose.model('Interest');

router.get('/postInterest', function(req, res, next){
  var location = new Interest();
  

  /*location.save().then(function(){
    return res.send('location saved');
  }).catch(next);*/
});

module.exports = router;