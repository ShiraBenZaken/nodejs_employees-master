const express = require('express');
const app = express();
const employee = require('./employee');
const presence = require('./presence');
var bodyParser = require('body-parser');
const fs=require('fs');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
  res.send('<b>Hello World!</b>');
});

app.use('/employee',employee);
app.use('/presence',presence);

//אם מגיע לכאן אז לא הצליח להתחבר
app.use(function (req, res, next) {
  console.log("url not found");
  next();
 });

 app.use(function (req, res, next) {
res.send("url not found");
 });