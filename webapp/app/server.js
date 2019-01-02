'use strict';

const express = require('express');
const mongodb = require('mongodb');

// Constants
const url = "mongodb://username:password@subdomain.mlab.com:port"
const dbname = "dbname"
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
    db.close();
  }
});


// App
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path + "index.html");
});

app.get('/datepickk.css', (req, res) => {
  res.sendFile(path + "datepickk.css");
});

app.get('/datepickk.js', (req, res) => {
  res.sendFile(path + "datepickk.js");
});

app.get('/style.css', (req, res) => {
  res.sendFile(path + "style.css");
});

app.get('/pmchart.js', (req, res) => {
  res.sendFile(path + "pmchart.js");
});

app.get('/AQData.json', (req, res) => {
  client.connect(url, {
    useNewUrlParser: true
  }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbname);
    dbo.collection("PMValues").find({}).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      res.send(result)
      db.close();
    });
  });
});

app.get('/getAQData', (req, res) => {
  let start = parseInt(req.query.start);
  let end = parseInt(req.query.end);
  console.log("Querying data points between: ")
  console.log("Start = " + start)
  console.log("End = " + end)

  client.connect(url, {
    useNewUrlParser: true
  }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbname);
    dbo.collection("PMValues").find({
      epoch_timestamp: {
        $gt: start,
        $lt: end
      }
    }).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
});

app.use(express.static('node_modules'))

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
