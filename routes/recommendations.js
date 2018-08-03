var mongoose = require('mongoose');
var router = require('express').Router();
var AirModel = mongoose.model('AirReco');
var AirRecosList = mongoose.model('AirRecosList');
var CarRecosList = mongoose.model('CarRecos');
var HotelRecosList = mongoose.model('HotelRecos');
var requestify = require('requestify'); 



var airrecos = '';
var hotelrecos = '';
var carrecos = '';

router.post('/airRecos', function(req, res){  
   var source = req.body.source;
   var dest = req.body.dest;
   var departure_date = req.body.departure_date;
   var arrival_date = req.body.arrival_date; 
   var url = 'https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=lA2oAYa7Hkie9dHntgLxhnkVoSAGrd7k&origin='+source+'&destination='+dest+'&departure_date='+departure_date+'&return_date='+arrival_date;
    requestify.get(url).then(function(response) {
        // Get the response body      
        airrecos = response.body;
        var recoList =  new AirRecosList({
            air : airrecos
        });
        recoList.save(function(err, result) {
            console.log("aIR ADDED");
            res.send(JSON.stringify(response.body));
          });

    });  
  });

  
  router.get('/carRecos', function(req, res){ 
    console.log("1");
    var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=lA2oAYa7Hkie9dHntgLxhnkVoSAGrd7k&location=NCE&check_in=2018-09-01&check_out=2018-09-28'
     requestify.get(url).then(function(response) {
         // Get the response body       
         carrecos = response.body;
         var carRecoList =  new CarRecosList({
             car : carrecos
         });
         //console.log(carrecos);
         carRecoList.save(function(err, result) {
             console.log("Cars ADDED");
             res.send(JSON.stringify(response.body));
           });
 
     });  
   });

     
  router.get('/hotelRecos', function(req, res){  
    var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=lA2oAYa7Hkie9dHntgLxhnkVoSAGrd7k&location=NCE&check_in=2018-09-01&check_out=2018-09-28'
     requestify.get(url).then(function(response) {
         // Get the response body        
         hotelrecos = response.body;
         var hotelRecoList =  new HotelRecosList({
             hotel : hotelrecos
         });
         hotelRecoList.save(function(err, result) {
            console.log("hOTELS ADDED");
            res.send(JSON.stringify(response.body));
           });
 
     });  
   });

   router.get('/getCars',function(req,res){
	CarRecosList.find(function(err,response){
			res.send(response)
        });
    });
    router.get('/getHotels',function(req,res){
        HotelRecosList.find(function(err,response){
                res.send(response)
            });
    });
    router.get('/getFlights',function(req,res){
        AirRecosList.find(function(err,response){
                res.send(JSON.stringify(response))
            });
    });


module.exports = router