// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/", function (req, res, next) {
  
 
   // let myUnix=	Math.floor(new Date().getTime());
  let myUnix = Date.now();
    var myDate = new Date();
    res.json({  "unix": myUnix, "utc": myDate.toGMTString() });
    

});

// your first API endpoint... 
app.get("/api/timestamp/:date_string", function (req, res, next) {
  let input = req.params.date_string;
  console.log(input);
  let unix_reg = /\d{5,}/;
  let date_reg = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
  
  if(unix_reg.test(input)){
   // if(/^[0-9]{8}$/){
       
   //    }
    console.log('matches unix ....');
    let altered_input = parseInt(input);
    var myDate = new Date( altered_input);
    //console.log(myDate);
     res.json({"unix": input, "utc": myDate.toUTCString()});
     }
  let date_object = new Date(input);
  if( date_object.toString() === "Invalid Date" ){
    res.json({"error" : "Invalid Date" });
  }
  else{
    console.log('matches utc ...');
    //let input_array = input.split('-');
   // console.log(input_array);
   // let yy = parseInt(input_array[0], 10);
   // let mm = parseInt(input_array[1], 10) -1;
   // let dd = parseInt(input_array[2], 10);
    //console.log(yy , mm , dd);
   // let myUnix=	Math.floor(new Date(yy , mm , dd, 0 , 0).getTime());
    let myUnix = date_object.valueOf();
    let myDate = date_object.toUTCString();
    res.json({"unix": myUnix, "utc": myDate});

  }
  
  


  
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});