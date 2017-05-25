var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    path = require('path'),
    http = require('http'),
    viewPath = path.join(__dirname+'/public'),
    jsPath = path.join(__dirname+'/public/javascripts'),
    cssPath = path.join(__dirname+'/public/stylesheets'),
    fontImgPath = path.join(__dirname+'/public/fontsAndImages'),
		mongoose = require('./bin/mongo.js'),
    cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cookieParser());

// set a cookie


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

	res.clearCookie('username')
    .clearCookie('name')
    .clearCookie('email')
    .sendFile(path.join(__dirname+'/public/html/login.html'));
});
app.get('/contact', function(req, res){
	res.sendFile(path.join(__dirname+'/public/html/contact.html'));
});
app.get('/admin/:username',function(req,res){
  res.cookie('username',req.params.username)
    .redirect('/admin');
});
app.get('/home/:name/:email',function(req,res){
  res.cookie('name',req.params.name)
    .cookie('email',req.params.email)
    .redirect('/home');
});
app.get('/admin',function(req,res){
  if(req.cookies.username==''||req.cookies.username==undefined||req.cookies.username==null){
    res.redirect('/login');
    return;
  }
  res.sendFile(path.join(__dirname+'/public/html/admin.html'));
});
app.get('/home',function(req,res){
  if(req.cookies.name==''||req.cookies.email==''||req.cookies.name==undefined||req.cookies.email==undefined){
    res.redirect('/login');
    return;
  }
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

app.get('/login', function(req,res){
  res.redirect('/');
});

app.post('/signupForm',function(req,res){
  var data = req.body;
  if(data){
    mongoose.duplicate(data, function(err,docs){
      if(err){
        res.send(err);
        return;
      } else if(docs){
        console.log(docs);
        res.send('This email is being used. Please enter a new one.');
        return;
      } else{
        mongoose.signup(data,function(err,doc,status){
          if(err){
            console.log(err);
            res.send(status);
            return;
          } else{
            var obj = {};
            obj.name = doc.name;
            obj.email = doc.email;
            res.send(obj);
            return;
          }
        });
      }
    });
  } else{
    res.send('Failure to log in.');
  }
});
app.post('/loginForm',function(req,res){
  var data = req.body;
  if(data){
    mongoose.login(data,function(err,doc,status){
      if(err){
        console.log(err);
        res.send(status);
        return;
      } else if(!doc){
        console.log(status);
        res.send(status);
        return;
      } else{
        var obj = {};
        obj.name = doc.name;
        obj.email = doc.email;
        res.send(obj);
        return;
      }
    });
  } else{
    res.send('Failure to log in.');
  }
});
app.post('/adminForm',function(req,res){
  var data = req.body;
  if(data){
    mongoose.admin(data,function(err,doc,status){
      if(err){
        console.log(err);
        res.send(status);
        return;
      } else if(!doc){
        res.send(status);
        return;
      } else{
        var obj = {};
        obj.username = doc.username;
        res.send(obj.username);
        return;
      }
    });
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

// end of mongodb

app.use(function(req,res){
  res.status(404).sendFile(path.join(__dirname+'/public/html/error.html'));
});

module.exports = app;
