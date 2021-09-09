const express = require('express');
const app = express();
// const https = require('https');
const http = require('http');

const url = 'http://team-2-reliability-server.mkrs.link';

http.get(url, function(res) {
  console.log('Status code: ', res.statusCode); 

  if(res.statusCode === "500") {
    console.log('Inside conditional');
    http.get(url);
  } 

}).on('error', function(e) {
  console.error(e);
});

app.get('/', function (req, res) {
  res.send('Team 2 is the best!');
});

app.listen(process.env.PORT || '3000', function () {
  console.log('Listening on port 3000!');
});