var express = require('express');

var path = require('path');
var app = express();

/* GET home page. */


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = app;
