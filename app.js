var express = require('express');
var app = express();


app.get('/', function (req, res) {
  res.send('Team 2 is the best!');
});

app.listen(process.env.PORT || '3000', function () {
  console.log('Listening on port 3000!');
});