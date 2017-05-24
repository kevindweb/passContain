var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    path = require('path'),
    http = require('http'),
    viewPath = path.join(__dirname+'/public'),
    jsPath = path.join(__dirname+'/public/javascripts'),
    cssPath = path.join(__dirname+'/public/stylesheets'),
    fontImgPath = path.join(__dirname+'/public/fontsAndImages'),
		mongoose = require('./bin/mongo.js');

app.use(bodyParser.urlencoded({
	extended: false
}));

// view engine setup
app.set('public',viewPath);
app.use('/scripts',express.static(jsPath));
app.use('/styles',express.static(cssPath));
app.use('/fontsImg',express.static(fontImgPath));

app.set('view engine', 'jade');

// app.get('/public/:sourceType/:sourceFile',function(req,res){
// 	var sourceType = req.params.sourceType;
// 	var sourceFile = req.params.sourceFile;
// 	res.sendFile(__dirname+'/public/'+sourceType+'/'+sourceFile);
// });

// send me to the root of the application
app.get('/', function(req,res){
	res.sendFile(path.join(__dirname+'/public/html/login.html'));
});
app.get('/contact', function(req, res){
	res.sendFile(path.join(__dirname+'/public/html/contact.html'));
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

app.get('/login', function(req,res){
  res.redirect('/');
});

app.post('/signupForm',function(req,res){
  var data = req.body;
  if(data){
    res.send('Success');
  } else{
    res.send('Failure to log in.');
  }
});
app.post('/loginForm',function(req,res){
  var data = req.body;
  if(data){
    res.send('Success');
  } else{
    res.send('Failure to log in.');
  }
});
app.post('/adminForm',function(req,res){
  var data = req.body;
  if(data){
    res.send('Success');
  } else{
    res.send('Failure to log in.');
  }
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

app.updateErrorPage = function(pageName){
  // put page name in a mongodb collection
}
// end of mongodb

app.use(function(req,res){
  res.status(404).sendFile(path.join(__dirname+'/public/html/error.html'));
});

module.exports = app;
