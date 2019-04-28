var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');

var app = express();
var PORT = process.env.PORT || 8000;

var clientId = 'afa5db9e6e4e4840ad591f58dc5b6a2d'; // Spotify client id
var clientSecret = '7b231e9b2c524ac08b518761fbfff616'; // Spotify secret

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});


app.get('/', function (req, res) {
  res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
  res.send('SPOTIFY API');
})

// GET TOKEN
app.get('/get-spotify-token', function (req, res) {
  // Retrieve an access token.

  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'application/json');
  //res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
  spotifyApi.clientCredentialsGrant().then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
    /* console.log(data.body) */
    res.json(data.body)}, error => res.json(error));
  });

  // GET /tracks/:track
  app.get('/tracks/:tracks', function (req, res) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'application/json');
    //res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    spotifyApi.searchTracks(req.params.tracks)
      .then(function(data) {
        spotifyApi.clientCredentialsGrant().then(data => {
          spotifyApi.setAccessToken(data.body['access_token']);
        }, error => error);
        res.json(data.body);
      }, function(error) {
        res.json(error);
      });
    });

    // GET /artists/:artist
    app.get('/artists/:artists', function (req, res) {
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
      res.header('Access-Control-Allow-Headers', 'application/json');
      //res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
      spotifyApi.searchArtists(req.params.artists)
      .then(function(data) {
        spotifyApi.clientCredentialsGrant().then(data => {
          spotifyApi.setAccessToken(data.body['access_token']);
        }, error => error);
        res.json(data.body);
      }, function(error) {
        res.json(error);
      });
    });

    // GET /artist-by-id/:id
    app.get('/artist-by-id/:id', function (req, res) {
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
      res.header('Access-Control-Allow-Headers', 'application/json');
      //res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
      spotifyApi.getArtist(req.params.id)
      .then(function(data) {
        spotifyApi.clientCredentialsGrant().then(data => {
          spotifyApi.setAccessToken(data.body['access_token']);
        }, error => error);
        res.json(data.body);
      }, function(error) {
        res.json(error);
      });
    });

    // add track to playlist /add-track-to-playlist/:id
    app.get('/add-track-to-playlist/:id', function (req, res) {
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
      res.header('Access-Control-Allow-Headers', 'application/json');
      //res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
      spotifyApi.getArtist()


      spotifyApi.addTracksToPlaylist('4MMdfGYWuRgksL43sH3Fg5', [
        'spotify:track:' + req.params.id
      ]).then(function(data) {
        spotifyApi.clientCredentialsGrant().then(data => {
          spotifyApi.setAccessToken(data.body['access_token']);
        }, error => error);
        res.json(data.body);
      }, function(error) {
        res.json(error);
      });
    });

    // GET /artists/:artist/top-track
    app.get('/artists/:artists/top-track', function (req, res) {
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
      res.header('Access-Control-Allow-Headers', 'application/json');
      //res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
      spotifyApi.getArtistTopTracks(req.params.artists, 'ES')
      .then(function(data) {
        spotifyApi.clientCredentialsGrant().then(data => {
          spotifyApi.setAccessToken(data.body['access_token']);
        }, error => error);
        res.json(data.body);
      }, function(error) {
        res.json(error);
      });
    });

// Server port listening
app.listen(PORT, function () {
  console.log('Express served in the port ' + PORT)
  console.log('http://localhost:' + PORT)
});
