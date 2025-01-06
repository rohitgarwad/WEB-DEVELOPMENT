// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// require and cofigure dotenv
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// API endpoint for empty date parameter
app.get("/api", function (req, res) {
  let date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
})

// API endpoint for Timestamp Microservice
app.get("/api/:date", function (req, res) {
  let dateString = req.params.date;
  let date;

  // if dateString is empty
  if (!dateString) {
    date = new Date();
  }
  // if dateString is not empty
  else {
    // if date as a Date format like 25-12-2015
    if (isNaN(dateString)) {
      date = new Date(dateString);
    }
    // if date as a unix format
    else {
      date = new Date(parseInt(dateString));
    }
  }

  // determine if date is a string or an integer 
  if (date.toString() === "Invalid Date") {
    res.json({ error: date.toString() })
  }
  else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() })
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
