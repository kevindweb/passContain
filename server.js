var express = require('express');
var path = require('path');
var app     = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({
	extended: false
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('bin', path.join(__dirname, 'bin'));
app.set('view engine', 'jade');

app.use('/public',express.static(__dirname+'/public'));
app.use(errorHandler);
function errorHandler (err, req, res, next) {
  res.status(500);
  consolelog(500);
  res.render('error', { status:500,error: JSON.stringify(err) })
}
// app.get('/public/:sourceType/:sourceFile',function(req,res){
// 	var sourceType = req.params.sourceType;
// 	var sourceFile = req.params.sourceFile;
// 	res.sendFile(__dirname+'/public/'+sourceType+'/'+sourceFile);
// });

// send me to the root of the application
app.get('/', function(req,res){
	res.sendFile(path.join(__dirname+'/public/html/index.html'));
});
//send the js files
app.get('/login.js', function(req, res){
	res.sendFile(path.join(__dirname+'/bin/login.js'));
});

// here is our jade file to send
app.get('/runJade', function(req, res) {
    res.render('first', {title:'we finally won'});
});

// getting the login.jade file for those with credentials
app.get('/mongoLogin', function(req,res){
	res.render('login');
});

// get the encryption page
app.get('/encryptMe', function(req,res){
	res.sendFile(path.join(__dirname+'/public/html/encrypt.html'));
});

// get mongodb data
app.get('/mongodb', function(req,res){
	res.render('indexFile', {message: "We're ready for this mongodb connection"});
});

// get the passwords page
app.post('/passwordPage', function(req,res){
	var data = req.body.oldUsername;
	res.render('passwords',{data: data});
});

// get the file insert page
app.post('/makeFiles',function(req,res){
	var data = req.body.usernameLogged;
	res.render('makeFiles',{data:data});
});
// end of mongodb
app.listen(3001);

console.log("Running at Port 3001");

module.exports = app;
