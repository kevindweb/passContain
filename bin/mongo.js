var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    runFunction = require('../public/javascripts/encryptionOne.js'),
    exports = module.exports = {};
// here is all the mongoDB queries and data
//
var url = 'mongodb://localhost:27106/passwordSafety';

mongoose.connect(url, function(err,db){
	if(err){
		console.log(err);
	} else{
		console.log("Connected to the local mongoDB server");
	}
});

// here are the variables and the Schema for the application
var db = mongoose.connection;

var userInfoModel = new Schema({
	_id: {type:String},
	securePasswords: {
		passNumberOne: {type:String,required:true},
		passNumberTwo: {type:String,required:true},
		passNumberThree: {
			questionNumberOne: {type: String,required:true},
			questionNumberTwo: {type: String,required:true},
			questionNumberThree: {type: String,required:true}
		}
	}
}), mySchema = new Schema({
  _id:{type:String},
  name:{type:String},
  employed:{type:Boolean},
  business:{type:String},
  cool:{type:Boolean}
}), userSignup = new Schema({
  _id:{type:String,required:true},
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true}
}), adminLogin = new Schema({
  _id:{type:String,required:true},
  username:{type:String,required:true},
  password:{type:String,required:true}
});

var myModel = mongoose.model('firstCollection',mySchema);
var user = mongoose.model('secondcollection', userSignup);
var admin = mongoose.model('admincollections', adminLogin);
var userInformation = mongoose.model('thirdcollection',userInfoModel);
// as the database opens, we insert an initial
// document to ensure that it goes well
//
// db.once('open', function(){
// 	var isReady = false;
//   var password = runFunction('!easy2Remember');
// 	new admin({
// 		_id:mongoose.Types.ObjectId(),
// 		username:'kevindweb',
//     password:password
// 	}).save(function(err, doc){
// 		if(err){
// 			console.log(err);
// 		}
// 	});
// });
// check to see if email is a duplicate
exports.duplicate = function(data,callback){
  user.find({email:data.email}, function(err,docs){
		if(err){
			callback(err,null,'Your inputs might be correct, but database is having trouble. Try again.');
		} else if(docs===null||docs[0]===undefined){
      callback(null,null);
		} else{
      callback(null,docs);
		}
	});
}
// and when we need someone to sign in with their credentials
exports.signup = function(data,callback){
  var newObj = {};
  for (var variable in data) {
    if(variable=='password'){
      newObj[variable] = runFunction(data[variable]);
    } else{
      newObj[variable] = data[variable];
    }
  }
	new user({
		_id : mongoose.Types.ObjectId(),
    name: newObj.name,
		email: newObj.email,
		password: newObj.password,
	}).save(function(err,doc){
		if(err){
      callback(err,null,'Error');
		} else{
      callback(null,doc,'Success');
			console.log('we had success signing up');
		}
	});
}
// when we need to log in with mongodb
exports.login = function(data,callback){
  var emailLogin = data.email;
  var passwordLogin = runFunction(data.password);
	user.find({email:emailLogin,password:passwordLogin}, function(err,docs){
		if(err){
			callback(err,null,'Your inputs might be correct, but database is having trouble. Try again.');
		} else if(docs===null||docs[0]===undefined){
      callback(null,null,'We could not find a user with these credentials.');
		} else{
      callback(null,docs[0],'Success');
		}
	});
}
exports.admin = function(data,callback){
  var usernameAdmin = data.username;
  var passwordAdmin = runFunction(data.password);
	admin.find({username:usernameAdmin,password:passwordAdmin}, function(err,docs){
		if(err){
			callback(err,null,'Database is having trouble.');
		} else if(docs===null||docs[0]===undefined){
      callback(null,null,'You are an admin, you should know this.');
		} else{
      callback(null,docs[0],'Success');
		}
	});
}



// app.post('/mongoLogin', function(req,res){
// 	var emailLogin = runFunction(req.body.emailLogin);
// 	var passwordLogin = runFunction(req.body.passwordLogin);

// });
//
// // create a secure password set for the current user
// app.post('/passwordSet', function(req,res){
// 	var passwordList = [req.body.passwordSet1,req.body.passwordSet2,req.body.securitySet1,req.body.securitySet2,req.body.securitySet3];
// 	var passwordErrorMessage = [];
// 	passwordList.forEach(function(val,count){
// 		if(val==null||val==''||val==' '){
// 			passwordErrorMessage.push(count+1);
// 		}
// 	});
// 	if(passwordErrorMessage.length!==0){
// 		res.render('passwords',{data:req.body.usernameLogged,message:'These were not filled in. \n Input number: '+passwordErrorMessage.join(' ')+'. Please re-enter all your information.',scriptMessage:''});
// 		return;
// 	}
// 	if(isNaN(passwordList[1])===true||isNaN(passwordList[4])===true){
// 		res.render('passwords',{data:req.body.usernameLogged,message:'The second and last passwords must be integers.',scriptMessage:''});
// 		return;
// 	} else if(passwordList[1].length<=5||passwordList[1].length>=10){
// 		res.render('passwords',{data:req.body.usernameLogged,message:'The first number field must be more than 5 and less than 10 digits.',scriptMessage:''});
// 		return;
// 	} else if(passwordList[1].split('')[0]&&passwordList[3].split('')[0]!='0'){
// 		Number(req.body.passwordSet2);
// 		Number(req.body.securitySet3);
// 		console.log('Numbers are fine.')
// 	} else{
// 		res.render('passwords',{data:req.body.usernameLogged,message:'One or both of your integers had a leading zero. </br> This will be nullified in database.</br> Please change your number.',scriptMessage:''});
// 		return;
// 	}
// 	if(passwordList[3]!=='false'&&passwordList[3]!=='true'){
// 		res.render('passwords',{data:req.body.usernameLogged,message:'Please enter true or false for security question 2...',scriptMessage:''});
// 		return;
// 	} else if(passwordList[3]=='true'){
// 		console.log('Boolean is fine.');
// 		req.body.securitySet2=true;
// 	} else{
// 		console.log('Boolean is fine.');
// 		req.body.securitySet2=false;
// 	}
// 	var usernameCrypt = runFunction(req.body.usernameLogged);
// 	req.body.passwordSet1 = runFunction(req.body.passwordSet1);
// 	req.body.passwordSet2 = runFunction(req.body.passwordSet2);
// 	req.body.securitySet1 = runFunction(req.body.securitySet1);
// 	req.body.securitySet2 = runFunction(req.body.securitySet2);
// 	req.body.securitySet3 = runFunction(req.body.securitySet3);
// 	// set the information to mongo after validation
// 	new userInformation({
// 		_id: usernameCrypt,
// 		securePasswords: {
// 			passNumberOne: req.body.passwordSet1,
// 			passNumberTwo: req.body.passwordSet2,
// 			passNumberThree: {
// 				questionNumberOne: req.body.securitySet1,
// 				questionNumberTwo: req.body.securitySet2,
// 				questionNumberThree: req.body.securitySet3
// 			}
// 		}
// 	}).save(function(err,docs){
// 		console.log('Receiving data...')
// 		if(err){
// 			if (err.name == 'ValidationError') {
// 				var mongooseError = [];
// 				var newMessageError = [];
// 				for (field in err.errors) {
// 					mongooseError.push(field);
// 				}
// 				for(var i=0;i<mongooseError.length;i++){
// 					newMessageError.push('Error number '+(i+1)+': '+err.errors[mongooseError[i]]+' ');
// 				}
// 				newMessageError = newMessageError.join('\n');
// 				res.render('passwords',{data:req.body.usernameLogged,message:newMessageError,scriptMessage:''});
// 			} else if(err['code']===11000){
// 				res.render('passwords',{data:req.body.usernameLogged,message:'You have already written passwords to this account. </br> Please update on the right instead.',scriptMessage:''});
// 			}
// 		} else{
// 			console.log('I am working');
// 			res.render('passwords',{data:req.body.usernameLogged,message:'Your passwords are in the Database',scriptMessage:''});
// 		}
// 	});
// });
//
// app.post('/passwordUpdate',function(req,res){
// 	var postedListObject = [];
// 	var postedListKey = [];
// 	for(field in req.body){
// 		postedListObject.push(field);
// 	}
// 	for(var i=0;i<postedListObject.length;i++){
// 		if(req.body[postedListObject[i]]==''||req.body[postedListObject[i]]==' '||req.body[postedListObject[i]]==null){
// 			res.render('passwords',{data:req.body.usernameLogged,message2:'You need to fill all boxes in.',scriptMessage:''});
// 			return;
// 		}
// 		postedListKey.push(req.body[postedListObject[i]]);
// 	}
// 	// for(thing in postedListKey){
// 	//   thing = runFunction(thing);
// 	//   console.log(thing);
// 	// }
// 	var usernameCrypt = runFunction(req.body.usernameLogged);
// 	req.body.passwordSet1 = runFunction(req.body.passwordSet1);
// 	req.body.passwordSet2 = runFunction(req.body.passwordSet2);
// 	req.body.securitySet1 = runFunction(req.body.securitySet1);
// 	req.body.securitySet2 = runFunction(req.body.securitySet2);
// 	req.body.securitySet3 = runFunction(req.body.securitySet3);
// 	userInformation.find({
// 			_id: usernameCrypt,
// 			securePasswords: {
// 				passNumberOne: req.body.passwordSet1,
// 				passNumberTwo: req.body.passwordSet2,
// 				passNumberThree: {
// 					questionNumberOne: req.body.securitySet1,
// 					questionNumberTwo: req.body.securitySet2,
// 					questionNumberThree: req.body.securitySet3
// 				}
// 			}
// 		}, function(err,docs){
// 		if(err){
// 			console.log(err);
// 			res.render('passwords',{data:req.body.usernameLogged,message2:'There was an error with the server connection. please try again',scriptMessage:''});
// 		} else if(docs===null||docs[0]===undefined){
// 			console.log('The document was not found.');
// 			res.render('passwords',{data:req.body.usernameLogged,message2:'You must have entered the information wrong. </br>Try again.',scriptMessage:''});
// 		} else{
// 			res.render('passwords',{data:req.body.usernameLogged,message2:'Your passwords are correct, you can now select the password(s) </br> you want to change.',scriptMessage:'Account ready!'});
// 		}
// 	});
// });
//
//
// // end of all mongoDB related functions
