const express = require('express');
const app = express();
const fetch = require('node-fetch')

const TARGET_SERVER = "http://team-2-reliability-server.mkrs.link"

app.get('/*', async (req, res) => {
  let request = req.originalUrl
  console.log(`:: GET ${request}`)

  let attemptsLeft = 3;
  let upstreamResponse;

  while (attemptsLeft > 0) {
    let upstream = `http://${TARGET_SERVER}${request}`;
    console.log(`:: Attempt ${2 - attemptsLeft}: ${upstream}`)
    attemptsLeft = attemptsLeft - 1
    upstreamResponse = await fetch(upstream, {
      headers: { 'Authorization': req.header('Authorization') }
    })
    if (upstreamResponse.ok) {
      let text = await upstreamResponse.text()
      res.header('Content-Type', upstreamResponse.headers.get('content-type'))
         .status(upstreamResponse.status)
         .send(text)
      console.log(":: Successful!")
      return
    }
  }
  console.log(`:: Failed GET ${request}`)
  res.status(upstreamResponse.status).send(await upstreamResponse.text())
})


app.listen(process.env.PORT || '80', function () {
  console.log('Listening on port 80!');
  // // const https = require('https');
  // const http = require('http');
  
  // const url = 'http://team-2-reliability-server.mkrs.link';
  
  
  // app.all('*', function (req, res) {
  //   http.get(url)
  //   .on('response', function(response) {
  //     console.log(response.statusCode)
  //     console.log(response)
  //   })
  
  
    
  //   .on('error', function(e) {
  //     console.error(e);
  //   });
  //   res.send('Team 2 is the best!');
  // });
});