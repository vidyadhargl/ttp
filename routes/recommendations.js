var mongoose = require('mongoose');
var router = require('express').Router();
var AirRecosList = mongoose.model('AirRecosList');
var CarRecosList = mongoose.model('CarRecos');
var HotelRecosList = mongoose.model('HotelRecos');
var RecosList = mongoose.model('Recos');
var requestify = require('requestify'); 
var mailsender = require('../utils/emailsender.js')
var Interest = mongoose.model('Interest')

var airrecos = '';
var hotelrecos = '';
var carrecos = '';

var iataCodes = {
  'Amsterdam':'AMS',
  'London':'LON',
  'Bangalore':'BLR',
  'Nice':'NCE',
  'Toronto':'YYZ',
  'Tokyo':'NRT',
  'Berlin':'TXL',
  'San Francisco':'SFO',
  'Frankfurt':'FRA',
  'Rome':'FCO',
  'Paris': 'CDG'
}

router.get('/sendmail',function(req,res){
  mailsender.sendEmail(interestId)
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
  var resData = response;
  resData[0].air = JSON.parse(resData[0].air);
    res.send(resData)
  });
});

router.post('/carRecos', function(req, res){ 
  var InterestId = req.body.InterestId;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude
  var pickup_date = rq.body.pickup_date
  var dropoff_date = req.body.dropoff_date
  var url = 'https://api.sandbox.amadeus.com/v1.2/cars/search-circle?apikey=lA2oAYa7Hkie9dHntgLxhnkVoSAGrd7k&latitude='+latitude+'&longitude='+longitude+'&radius=42&pick_up='+pickup_date+'&drop_off=='+dropoff_date;
  requestify.get(url).then(function(response) {
    var query = {'InterestId':InterestId};
    var carRecoData = response.body
    RecosList.findOneAndUpdate(query, carRecoData, {upsert:true}, function(err, interest){
        if (err) return res.send(500, { error: err });
        return res.send(interest);
    });
  });  
});

//call this on attach reco
router.get('/getRecos/:id', function(req, res){  
  console.log('requst received for'+req.params.id)
  var InterestId = req.params.id;
  var source = "";
  var dest = "";
  var departure_date = "";
  var arrival_date = "";

  Interest.find({'_id': InterestId}, function(err,interest) {
    console.log(interest[0])
    if (err) return handleError(err)
    if(interest.length != 0) {
      source = iataCodes[interest[0].source.city];
      dest = iataCodes[interest[0].destination.city];
      departure_date = interest[0].fromDate;
      arrival_date = interest[0].toDate;

      RecosList.find({ 'InterestId': InterestId }, function (err, interest) {
        if (err) return handleError(err);
        if(interest.length != 0) {
          mailsender.sendEmail(InterestId);
          res.send(interest)
        } 
        else {
          var res_count = 0;
          getAirRecos(source,dest,departure_date,arrival_date,function(recos){
            airrecos = recos;
            res_count++;
            console.log('received air recos');
          });

          getHotelRecos(dest,departure_date,arrival_date,function(recos){
            hotelrecos = recos;
            res_count++
            console.log('received hotel recos');
          });

          var interval = setInterval(function() {
            console.log('waiting for response');
            if(res_count == 2) {
              saveRecos(InterestId,airrecos,hotelrecos,req,res)
              clearInterval(interval)
            }
          },2000);
        }
      });
    } 
  });
});

function handleError(err){
  res.send({'Error':'Unable to fetch data'});
}

function getHotelRecos(destination, dep_date, arr_date, getHotelRecosCallback){
  var dest = destination;
  var check_in_date = dep_date;
  var checkout_date = arr_date; 
  var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=lA2oAYa7Hkie9dHntgLxhnkVoSAGrd7k&location='+dest+'&check_in='+check_in_date+'&check_out='+checkout_date
  console.log('HotEL url'+url);
  requestify.get(url).then(function(response) {    
    getHotelRecosCallback(response.body);
  });  
}  

function getAirRecos(source,destination, dep_date, arr_date,getAirRecosCallback){
  var source = source;
  var dest = destination;
  var departure_date = dep_date;
  var arrival_date = arr_date; 
  var url = 'https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=lA2oAYa7Hkie9dHntgLxhnkVoSAGrd7k&origin='+source+'&destination='+dest+'&departure_date='+departure_date+'&return_date='+arrival_date;
  requestify.get(url).then(function(response) {
    getAirRecosCallback(response.body); 
  });  
} 

function saveRecos(InterestId, airrecos,hoterecos,req,res){
  var airRecoList =  new AirRecosList({
    air : airrecos
  });

  var hotelRecoList =  new HotelRecosList({
    hotel : hotelrecos
  });

  var recosList = new RecosList({
    InterestId: InterestId,
    AirRecos : airRecoList,           
    HotelRecos : hotelRecoList 
  });

  recosList.save(function(err, result) {
    console.log("RECOS ADDED");
    mailsender.sendEmail(InterestId)
    res.send(result);
  });
}

module.exports = router