const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const TARGET_SERVER = "team-2-reliability-server.mkrs.link"

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
      console.log(":: Successful!")
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
  console.log(`:: Failed POST ${request}`)
  res.status(upstreamResponse.status).send(await upstreamResponse.text())
})

app.patch('/*', async (req, res) => {
  let request = req.originalUrl
  console.log(`:: PATCH ${request}`)

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
      console.log(":: Successful!")
      return
    }
  }
  console.log(`:: Failed PATCH ${request}`)
  res.status(upstreamResponse.status).send(await upstreamResponse.text())
})

app.delete('/*', async (req, res) => {
  let request = req.originalUrl
  console.log(`:: DELETE ${request}`)

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
      console.log(":: Successful!")
      return
    }
  }
  console.log(`:: Failed DELETE ${request}`)
  res.status(upstreamResponse.status).send(await upstreamResponse.text())
})


app.listen(process.env.PORT || '80', function () {
  console.log('Listening on port 80!');
});

  