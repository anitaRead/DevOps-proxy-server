const express = require('express');
const app = express();
// const https = require('https');
const http = require('http');

const url = 'http://team-2-reliability-server.mkrs.link';


app.get('/', function (req, response) {
  http.get(url, function(res) { 
    console.log('I am inside the http request');

    if(res.statusCode === 200) {
      console.log('Inside conditional');

      http.get(url, function(secondRes) {
        console.log('Second http request');
        if (secondRes.statusCode === 200) {
          console.log(`Second try got a status code of ${res.statusCode}`);
        }
        response.redirect(url);
      });

    } else {
      console.log('Status code: ', res.statusCode);
      response.redirect(url);
    }
    
  })
  
});

app.listen(process.env.PORT || '80', function () {
  console.log('Listening on port 80!');
});