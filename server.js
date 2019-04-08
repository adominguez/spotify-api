var express = require('express');
var _ = require('underscore');
var https = require("https");
var request = require('request');

var app = express();
var PORT = process.env.PORT || 8000;

var client_id = 'afa5db9e6e4e4840ad591f58dc5b6a2d'; // Your client id
var client_secret = '7b231e9b2c524ac08b518761fbfff616'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};


app.get('/', function (req, res) {
  res.send('SPOTIFY API');
})

// GET /printers
app.get('/printers', function (req, res) {
  res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
  res.json(printers);
});


// GET /artist/:id
app.get('/artist/:id', function (req, res) {
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const query = req.params.id
      const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=15`;
      const token = body.access_token;

      var options = {
        url: url,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function (error, response, body) {
        if(!error) {
          console.log(body["artists"].items);
          return body["artists"].items
        } else {
          console.log('hay un error', error)
          return error;
        }
      });
    }
  });
});

// Server port listening
app.listen(PORT, function () {
  console.log('Express served in the port ' + PORT)
  console.log('http://localhost:' + PORT)
})
