const express = require('express');
const app = express();


app.get('/', function (req, res) {
  res.send('Team 2 is the best!');
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});