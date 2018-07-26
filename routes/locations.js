var mongoose = require('mongoose');
var router = require('express').Router();
var Location = mongoose.model('Location');

router.post('/locations', function(req, res, next){
  var location = new Location();

  location.location = somelocation
  location.category = somecategory
  location.imageURL = someurl

  location.save().then(function(){
    return res.send('location saved');
  }).catch(next);
});

module.exports = router;