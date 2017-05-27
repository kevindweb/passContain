$(document).ready(function (){
	// socket functions
	var thisPage = window.location.href.split('/').pop(),socket = io();
	socket.on('emailSent',function(data){
		if(data.res){
			$("#formName").val("");
			$("#formEmail").val("");
			$("#formMessage").val("");
			$("#formName").attr("placeholder","Message sent!");
		} else{
			alert('Server error, please try again.');
		}
	});

	// socket functions end
	if(thisPage==''){
		thisPage = '/';
	}
	function getSwitch(a){switch(a){case"admin":getAdmin();break;case"home":getHome();break;case"/":getLogin();break;case"contact":getContact();break;case"contact?":getContact();break;default:getError();break;}}
	getSwitch(thisPage);
	function getError(){
		socket.emit('errorPageData',{pageName:thisPage});
	}
	function getContact(){
	  $("#submitMessage").click(function(e){
	     e.preventDefault();
	     message = {};
	     message.from = '"'+$("#formName").val()+'" <gravfieldgame@gmail.com>';
	     message.to = 'gravfieldgame@gmail.com';
	     message.subject = 'Regarding gravField';
	     message.html = '<h3>My name is:</h3><p>'+$("#formName").val()+'</p><br><h3>My message is:</h3><p>'+$("#formMessage").val()+'</p><br><h3>My email is:</h3><p>'+$("#formEmail").val()+'</p>';
	  	 socket.emit('sendEmail',message);
	  });
	}
	function getLogin(){
		var loginTruth = false;
		var adminTruth = false;
		var section = '';
		$(".loginSectionLink").click(function(e){
			e.preventDefault();
			if(loginTruth){
				section = 'loginSection';
			} else if(adminTruth){
				section = 'adminSection';
			} else{
				section  = 'signUpSection';
			}
			$("#"+section).hide(300);
			setTimeout(function(){
				$("#loginSection").show(300);
			},290);
			loginTruth = true;
			adminTruth = false;
		});
		$(".signUpSectionLink").click(function(e){
			e.preventDefault();
			if(loginTruth){
				section = 'loginSection';
			} else if(adminTruth){
				section = 'adminSection';
			} else{
				section  = 'signUpSection';
			}
			$("#"+section).hide(300);
			setTimeout(function(){
				$("#signUpSection").show(300);
			},290);
			loginTruth = false;
			adminTruth = false;
		});
		$(".adminSectionLink").click(function(e){
			e.preventDefault();
			if(loginTruth){
				section = 'loginSection';
			} else if(adminTruth){
				section = 'adminSection';
			} else{
				section = 'signUpSection';
			}
			$("#"+section).hide(300);
			setTimeout(function(){
				$("#adminSection").show(300);
			},290);
			loginTruth = false;
			adminTruth = true;
		});
		$(".login-button").click(function(e){
			e.preventDefault();
			if($("#emailLogin").val()!=''&&$("#passwordLogin").val()!=''){
				$.post("/loginForm",$("#loginForm").serialize(),function(data, status){
					if(typeof data!=String){
						window.location.replace('/home/'+data.name+'/'+data.email);
					} else{
						console.log(data);
					}
	    	});
			}
		});
		$(".signup-button").click(function(e){
			e.preventDefault();
			browserId = document.cookie;
			browserId = browserId.split('randomBrowser=')[1];
			socket.emit('clicked',{id:browserId});
			// if($("#confirmSignup").val()!=''){
			// 	$.post("/signupForm",$("#signUpForm").serialize(),function(data, status){
			// 		if(typeof data!=String){
			// 			window.location.replace('/home/'+encodeURIComponent(data.name)+'/'+encodeURIComponent(data.email));
			// 		} else{
			// 			console.log(data);
			// 		}
	    // 	});
			// }
		});
		$(".admin-button").click(function(e){
			e.preventDefault();
			if($("#usernameAdmin").val()!=''&&$("#passwordAdmin").val()!=''){
				$.post("/adminForm",$("#adminForm").serialize(),function(data, status){
					if(data==$("#usernameAdmin").val()){
						window.location.replace('/admin/'+encodeURIComponent(data));
					} else{
						$("#usernameAdmin").val(JSON.stringify(data));
					}
	    	});
			}
		});
		$("#close").click(function(){
			$(".alert").hide(200);
		});
	}
	function getAdmin(){
		var stuff = document.cookie;
		$("#title").text(decodeURIComponent(stuff.split('username=')[1]));
	}
	function getHome(){
		var stuff = document.cookie;
		stuff = stuff.split('name=')[1];
		stuff = stuff.split('email=')[0];
		stuff = decodeURIComponent(stuff.split(';')[0]);
		$('#title').text('Welcome, '+stuff);
	  var trigger = $('.hamburger'),
	      overlay = $('.overlay'),
	     isClosed = false;

	    trigger.click(function () {
	      hamburger_cross();
	    });

	    function hamburger_cross() {

	      if (isClosed == true) {
	        overlay.hide(300);
	        trigger.removeClass('is-open');
	        trigger.addClass('is-closed');
	        isClosed = false;
	      } else {
	        overlay.show(300);
	        trigger.removeClass('is-closed');
	        trigger.addClass('is-open');
	        isClosed = true;
	      }
	  }
	  $('[data-toggle="offcanvas"]').click(function () {
	        $('#wrapper').toggleClass('toggled');
	  });
		$('.dropdown').on('show.bs.dropdown', function() {
	    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
	  });
	  $('.dropdown').on('hide.bs.dropdown', function() {
	    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
	  });
	}
	// socket listeners
	socket.on('alertClick',function(){
		$(".alert").show(200);
		console.log('Clicked too many times');
	});
	socket.on('tooMany',function(){
		// hurtBrowser();
		console.log('We are going to attack you...')
	});
});
