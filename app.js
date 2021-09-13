const express = require('express');
const app = express();
// const https = require('https');
const http = require('http');

const url = 'http://team-2-reliability-server.mkrs.link';


app.get('/*', function (req, res) {
  http.get(url)
  .on('response', function(response) {
    console.log(response.statusCode)
    console.log(response)
  })


  
  .on('error', function(e) {
    console.error(e);
  });
  res.send('Team 2 is the best!');
});

app.listen(process.env.PORT || '80', function () {
  console.log('Listening on port 80!');
});