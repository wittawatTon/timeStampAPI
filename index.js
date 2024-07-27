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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function getDate(input){
  let date;
  console.log(input);
  if (input === undefined || input === null || input === '') {
    date = new Date();
  }else {
    date = new Date(input);
  }
  return {
    unix:date.getTime(),
    utc:date.toUTCString()
  }
}

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  
  // Handle empty or undefined dateParam
  if (dateParam === undefined || dateParam === null || dateParam === '') {
    res.json(getDate());
    return;
  }

  // Check if dateParam is a valid ISO date string
  const isoDate = new Date(dateParam);
  const isValidIso = isoDate.toString() !== 'Invalid Date';


  // Check if dateParam is a valid UNIX timestamp
  const unixTimestamp = parseInt(dateParam);
  const isValidUnix = !isNaN(unixTimestamp) && new Date(unixTimestamp).getTime() > 0;
  
  console.log("INPUT:" + dateParam + " ISO: " + isoDate + " cvt: " + isoDate.getTime() + " Unix: " + unixTimestamp)
  
  if (isValidIso) {
    // Valid ISO date string
    res.json(getDate(isoDate.getTime()));
  } else if (isValidUnix) {
    // Valid Unix timestamp
    res.json(getDate(unixTimestamp));
  } else {
    // Invalid date format
    res.json({ error: "Invalid Date" });
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
