const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const TARGET_SERVER = "ec2-3-9-12-172.eu-west-2.compute.amazonaws.com";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/*', async (req, res) => {
  let request = req.originalUrl
  console.log(`:: GET ${request}`)

  let attemptsLeft = 3;
  let upstreamResponse;

  while (attemptsLeft > 0) {
    let upstream = `http://${TARGET_SERVER}${request}`;
    console.log(`:: Attempt ${4 - attemptsLeft}: ${upstream}`)
    attemptsLeft = attemptsLeft - 1
    upstreamResponse = await fetch(upstream, {
      headers: { 'Authorization': req.header('Authorization') }
    })
    if (upstreamResponse.ok) {
      let text = await upstreamResponse.text()
      res.header('Content-Type', upstreamResponse.headers.get('content-type'))
         .status(upstreamResponse.status)
         .send(text)
      console.log(":: Successful GET!")
      return
    }
  }
  console.log(`:: Failed GET ${request}`)
  res.status(upstreamResponse.status).send(await upstreamResponse.text())
})

app.post('/*', async (req, res) => {
  let request = req.originalUrl
  console.log(`:: POST ${request}`)

  let attemptsLeft = 3;
  let upstreamResponse;

  while (attemptsLeft > 0) {
    let upstream = `http://${TARGET_SERVER}${request}`;
    console.log(`:: Attempt ${4 - attemptsLeft}: ${upstream}`)
    attemptsLeft = attemptsLeft - 1
    upstreamResponse = await fetch(upstream, {
      method: 'post',
	    body: JSON.stringify(req.body),
      headers: { 'Authorization': req.header('Authorization'),
                  'Content-type': 'application/json' 
                }
    })

    if (upstreamResponse.ok) {
      let text = await upstreamResponse.text()
      res.header('Content-Type', upstreamResponse.headers.get('content-type'))
         .status(upstreamResponse.status)
         .send(text)
      console.log(":: Successful POST!")
      return
    }
  }
  console.log(`:: Failed POST ${request}`)
  res.status(upstreamResponse.status).send(await upstreamResponse.text())
})

app.listen(process.env.PORT || '80', function () {
  console.log('Listening on port 80!');
});

  