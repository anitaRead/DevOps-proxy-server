const express = require('express');
const app = express();
// const https = require('https');
const http = require('http');

const url = 'http://team-2-reliability-server.mkrs.link';


app.get('/', function (req, res) {
  http.get(url, function(res) { 
  
    if(res.statusCode !== 200) {
      console.log('Inside conditional');
      http.get(url);
    } else {
      console.log('Status code: ', res.statusCode);
    }
  
  }).on('error', function(e) {
    console.error(e);
  });
  res.send('Team 2 is the best!');
});

app.listen(process.env.PORT || '80', function () {
  console.log('Listening on port 80!');
});