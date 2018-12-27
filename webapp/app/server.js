'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const path = __dirname + '/views/';
var router = express.Router();
var Chart = require('chart.js');

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

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
