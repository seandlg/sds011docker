'use strict';

const express = require('express');
const mongodb = require('mongodb');

// Constants
const config = require('./db.js');
const client = mongodb.MongoClient;
const PORT = 8080;
const HOST = '0.0.0.0';
const path = __dirname + '/views/';

// Database
client.connect(config.DB, function(err, db) {
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
  res.sendFile("/data/AQIData.csv");
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
