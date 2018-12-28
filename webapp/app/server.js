'use strict';

const express = require('express');
const mongodb = require('mongodb');

// Constants
const url = 'mongodb://database:27017/sensordatadb'
const client = mongodb.MongoClient;
const PORT = 8080;
const HOST = '0.0.0.0';
const path = __dirname + '/views/';

// Database
client.connect(url, {
  useNewUrlParser: true
}, function(err, db) {
  if (err) {
    console.log('Database is not connected.')
  } else {
    console.log('Database connected!')
  }
});


// App
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path + "index.html");
});

app.get('/style.css', (req, res) => {
  res.sendFile(path + "style.css");
});

app.get('/pmchart.js', (req, res) => {
  res.sendFile(path + "pmchart.js");
});

app.get('/AQIData.txt', (req, res) => {
  res.sendFile("/data/AQIData.txt");
});

app.get('/AQIData.csv', (req, res) => {
  res.sendFile("/data/AQIData.csv");
});

app.get('/AQIData.json', (req, res) => {
  client.connect(url, {
    useNewUrlParser: true
  }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("SensorData");
    dbo.collection("PMValues").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result)
      db.close();
    });
  });
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
