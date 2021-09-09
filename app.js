const express = require('express');
const app = express();


app.get('/', function (req, res) {
  url = "http://www.google.com";
  res.redirect(url);
  console.log(res.statusCode);
  if(res.statusCode === 500) {
    res.redirect(url);
  }
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});