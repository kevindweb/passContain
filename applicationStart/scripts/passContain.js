$(document).ready(function (){
	console.log("sweet");
	window.location.hash = "#container";
	function waitSeconds(){
		document.body.style.backgroundColor = "black";
		document.getElementById("upwardsGreeting").style.color = "white";
		document.getElementById("greeting").style.color = "white";
		document.getElementById("lockIcon").style.color = "white";
		document.getElementById("homePage").className = "";
	};
	// Add smooth scrolling to all links
  	$("a").on('click', function(event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
		  // Prevent default anchor click behavior
		  event.preventDefault();

		  // Store hash
		  var hash = this.hash;

		  // Using jQuery's animate() method to add smooth page scroll
		  // The optional number (800) specifies the number of 
		  // milliseconds it takes to scroll to the specified area
		  $('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 800, function(){

		    // Add hash (#) to URL when done scrolling (default click behavior)
		    window.location.hash = hash;
		  });
		} // End if
  	});
  	// end of smooth scrolling
	function newPage(){
		$("#pageDown").click();
	};
	$("#submitName").click(function (){
		var username = $("#userName").val();
		if(username!==""&&username!==" "){
			$("#userNamez").text(" "+username);
			$("#userID").text(username);
			$("#introduction").fadeOut();
			var waiting = setInterval(waitSeconds,400);
			var reloading = setInterval(newPage, 2700);
		} else if(username===""){
			document.getElementById("userName").placeholder = "please enter a character or word";
		} else{
			$("#userName").val("please enter a character or word");
		} 
		
	});






});