// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//
app.get('/api/:date?', function(req, res){
  date = req.params.date
  let dateTM = parseInt(date)
  if(date){
    if(!isNaN(date)){
      dateString = new Date(dateTM)
    }else{
      dateString = new Date(date)
    }
  }else{
    dateString = new Date()
  }
  let dateGMT = new Date(dateString).toUTCString()
  const unix = dateString.valueOf()
  let container;
  if(dateGMT !== "Invalid Date"){
    container = {unix: unix , utc : `${dateGMT}`}
  }else{
    container = {error: "Invalid Date"}
  }
  res.json(container)
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
