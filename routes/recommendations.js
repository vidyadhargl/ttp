var mongoose = require('mongoose');
var router = require('express').Router();
var AirRecosList = mongoose.model('AirRecosList');
var CarRecosList = mongoose.model('CarRecos');
var HotelRecosList = mongoose.model('HotelRecos');
var RecosList = mongoose.model('Recos');
var requestify = require('requestify'); 



var airrecos = '';
var hotelrecos = '';
var carrecos = '';

function getAirRecos(source,destination, dep_date, arr_date,getAirRecosCallback){
    var source = source;
    var dest = destination;
    var departure_date = dep_date;
    var arrival_date = arr_date; 
    var url = 'https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=lA2oAYa7Hkie9dHntgLxhnkVoSAGrd7k&origin='+source+'&destination='+dest+'&departure_date='+departure_date+'&return_date='+arrival_date;
     requestify.get(url).then(function(response) {
         // Get the response body 
         //console.log(response.body);
         getAirRecosCallback(response.body); 
     });  
}
 
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
             res.send(response.body);
           });
 
     });  
   });

  function getHotelRecos(destination, dep_date, arr_date, getHotelRecosCallback){
    var dest = destination;
    var check_in_date = dep_date;
    var checkout_date = arr_date; 
    var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=lA2oAYa7Hkie9dHntgLxhnkVoSAGrd7k&location='+dest+'&check_in='+check_in_date+'&check_out='+checkout_date
    console.log('HotEL url'+url);
    requestify.get(url).then(function(response) {
        // Get the response body   
        //console.log(response.body);     
        getHotelRecosCallback(response.body);
    });  
  }   
  
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
                var resData = response;
                resData[0].air = JSON.parse(resData[0].air);
                res.send(resData)
            });
    });


    router.get('/getRecos', function(req, res){  
       /* var interestId = req.body.interestId;
        var source = req.body.source
        var dest = req.body.dest;
        var departure_date = req.body.departure_date;
        var arrival_date = req.body.arrival_date; */
        checkIfRecosExist('1234g');

        // var interestId = '1234';
        // var source = 'BLR'
        // var dest = 'NCE';
        // var departure_date = '2018-09-01';
        // var arrival_date = '2018-09-28';
        // //var airrecos = {};
        // //var hoterecos = {};
        // var res_count = 0;
        // getAirRecos(source,dest,departure_date,arrival_date,function(recos){
        //     airrecos = recos;
        //     res_count++;
        //     console.log('received air recos');
        //  });
        
        // getHotelRecos(dest,departure_date,arrival_date,function(recos){
        //     hotelrecos = recos;
        //     res_count++
        //     console.log('received hotel recos');
        //  });

        // var interval = setInterval(function() {
        //     console.log('waiting for response');
        //     if(res_count == 2) {
        //         saveRecos(interestId,airrecos,hotelrecos,req,res)
        //         clearInterval(interval)
        //     }
        // },2000);
    });

   function checkIfRecosExist(interestId){
    RecosList.find( {interestId:"1234"},
		function(err,response){
			var names = ""
			for (const key of Object.keys(response)) {
			    names+="<br> "+response[key].interestId;
			}
			console.log(names);
		})
   }

    function saveRecos(interestId, airrecos,hoterecos,req,res){
        console.log('save recos called');
        var airRecoList =  new AirRecosList({
            air : airrecos
        });

        var hotelRecoList =  new HotelRecosList({
            hotel : hotelrecos
        });

        var recosList = new RecosList({
            id: interestId,
            AirRecos : airRecoList,           
            HotelRecos : hotelRecoList 
        });
        recosList.save(function(err, result) {
            console.log("RECOS ADDED");
            res.send(result);
          });
    }
       
module.exports = router