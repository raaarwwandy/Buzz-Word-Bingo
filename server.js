/*jshint esversion:6 */

const express = require('express');
const  bodyParser = require('body-parser');
const querystring = require('querystring');
const PORT = process.env.PORT || 3000;

var app = express();
let buzzWordArray = [ ];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res){
  res.sendFile( __dirname + '/public/index.html');
});

app.get('/buzzwords', function(req, res){
   res.send({"Buzz Words" : buzzWordArray});
});


app.post('/buzzwords', function(req, res){
  if(typeof req.body === 'object'){
    buzzWordArray.push(req.body);
    res.json({'sucess': 'true'});
  } else {
    res.json({'sucess' : 'false'});
  }
});


app.put('/buzzwords', function(req, res){
  for(var i = 0; i < buzzWordArray.length; i++){
    if(req.body.buzzWord === buzzWordArray[i].buzzWord){
      let pointsValue = paseInt(buzzwordArray[i].points);
      let reqPoints = parseInt(req.body.points);
      buzzWordArray[i].points = pointsValue + reqPoints;
      buzzwordArray[i].heard = true;
      res.json({'sucess': true, 'newPoints': buzzWordArray[i].points});
    }
  }
});

app.delete('/buzzwords', function(req, res){
  for(var i = 0; i < buzzwordArray.length; i++){
    if(req.body.buzzWord === buzzwordArray[i].buzzWord){
      buzzwordArray.splice(i, 1, 0);
      res.json({'sucess': true});
    }
  }
});

app.reset('/buzzwords', function(req, res){
  if(req.body.reset === 'true'){
    buzzwordArray = [];
    res.json({'sucess': 'true'});
  } else {
    res.json({'sucess': 'true'});
  }
});



var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('were listening');
});
