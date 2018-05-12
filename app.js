$(document).ready(function($){

	getLocation();

	var unsplashPath = "https://api.unsplash.com/photos/";
	var unsplashID = "/?client_id=0948fb2a7b1a5aebf7b7f7bb8571835a01ac8d35f9e784a1aaf16b8988c031f8";

	// Store all the ID of the images that represent the different weather options
	var imageID = {
		"clear skyd": 			"uivWDK2Ifrg", 
	   	"clear skyn": 			"j-F6OVhR3mU",
	    	"few cloudsd": 			"oyrtK2hJqBY",
	    	"few cloudsn": 			"R2HlismuruI",
	    	"scattered cloudsd" : 		"R6KyoSRvQTk",
	    	"scattered cloudsn" : 		"G3EDWxWJXpI",
	    	"overcast cloudsd" : 		"LZfpD7ckSOE",
      	    	"overcast cloudsn" : 		"Ta9_HNeuQkU",
	    	"broken cloudsd" : 		"x7whfPFXzxI",
	    	"broken cloudsn" : 		"h_gwdi8UH2o",
	    	"shower raind" : 		"Kwi60PbAM9I",
	    	"shower rainn" : 		"wy0CiGoYiKE",
	    	"raind" : 			"mYOea-xnu-k",
	    	"rainn" : 			"5s1pIwDi8eA",
	    	"thunderstormd" : 		"dg5KvcVv7tU",
	    	"thunderstormn" : 		"vmvlzJz1lHg",
	    	"snowd" : 			"VMphSM-RqBo",
	    	"snown" : 			"yHLTI3zwydg",
	    	"mistd" : 			"QDPo00WyGXg",
	    	"mistn" : 			"jGN7JUKZcU0"
	}
  
	var lat = '';
	var lon = '';
	var units = 'metric';

	// Check if geolocation is supported
	function getLocation() {
	    if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(setPosition);
	    } else { 
	      alert("Geolocation is not supported by this browser.");
	    }
	}

	// Set the variables for location and check for the weather
	function setPosition(position) {
	    lat = position.coords.latitude;
	    lon = position.coords.longitude;
	    weather();
	}
	
	// Conect to the weather API
	function weather(){

		var appKey = "4823e0379d7d603fb2cbfdbad5c5842e";

		var request = $.ajax({
			type: 'GET',
			url: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+appKey+"&units="+units+"",
			crossDomain: true,
			dataType: 'json',
			success: function(data){
				console.log('success', data);
			},
			error: function(e){
				console.log('Error Loading Weather', e);
			},

		});

		// If everything works get the corresponding image and populate the text fields
		request.done(function(data){
			getImage(data);
			populate(data);
		});
	};	

	// Get the image
	function getImage(data){

   		var iconImgCode = data.weather[0].icon;
		var iconTime = iconImgCode[iconImgCode.length-1];
		var description = data.weather[0].description + iconTime;
		var url = unsplashPath + imageID[description] + unsplashID;

		// Connect to Unsplash API
		var requestImage = $.ajax({
			type: 'GET',
			url: url,
			crossDomain: true,
			dataType: 'json',
			success: function(data){
				console.log('success', data);
				$("body").css("background-image", "url("+data.urls.full+")");

				var imageCredits="Photo by <a target='_blank' href='"+data.user.links.html+"'>"+data.user.name+"</a> / <a target='_blank' href='https://unsplash.com/'>Unsplash</a>";

				$("#img-credits").html(imageCredits);
			},
			error: function(e){
				console.log('Error Loading Image', e);
			},

		});
	}

	// Populate data
	function populate(data){

		// Reset fields
		$("#temperature").empty();
		$("#card-title").empty();
		$("#weather-icon").empty();
		$("#description").empty();

		$("#card-title").append(data.name);
		$("#description").append(data.weather[0].description);
		$("#temperature").append(data.main.temp);

		if(units === 'metric'){
			$("#temperature").append(' °C');
		}else if ( units === 'imperial' ){
			$("#temperature").append(' °F');
		}

		var iconImgCode = data.weather[0].icon;
		var iconTime = iconImgCode[iconImgCode.length-1];

		var icon = '<i class="owf owf-'+data.weather[0].id+'-'+iconTime+'"></i>'
		$("#weather-icon").append(icon);

	}

	// Click functions to change units

	$("#celsius").click(function(){
		units = 'metric';
		weather();
	});

	$("#fahrenheit").click(function(){
		units = 'imperial';
		weather();
	});

});


