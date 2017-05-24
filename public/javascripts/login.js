console.log('ready to post the form');

function myServer(){
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var userAge = document.getElementById('age').value;
	var data = [];
	data.push(email,password,userAge);
	console.log(data);
	module.exports = data;
	
}


// form validation
// function formValidation(){
// 		if(email.value.split('').indexOf('@')!==0 && !userAge.value().isNaN()){

// 		console.log('first step complete.');

// 		if(password.value.split('').length>=1){
// 			return false;
// 			console.log('not ready!')
// 		}
// 	}
// 	return false;
// }