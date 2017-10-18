$(document).ready(function($){

	getLocation();

	var unsplashPath = "https://api.unsplash.com/photos/";
	var unsplashID = "/?client_id=0948fb2a7b1a5aebf7b7f7bb8571835a01ac8d35f9e784a1aaf16b8988c031f8";

	var imageID = {
		"clear sky": "uivWDK2Ifrg", 
	}
  
	var lat = '';
	var lon = '';
	var units = 'metric';

	function getLocation() {
	    if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(setPosition);
	    } else { 
	      alert("Geolocation is not supported by this browser.");
	    }
	}

	function setPosition(position) {
	    lat = position.coords.latitude;
	    lon = position.coords.longitude;
	    weather();
	}
	
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

		request.done(function(data){
			getImage(data);
			populate(data);
		});
	};	

	function getImage(data){
		var description = data.weather[0].description;
		var url = unsplashPath + imageID[description] + unsplashID;

		var requestImage = $.ajax({
			type: 'GET',
			url: url,
			crossDomain: true,
			dataType: 'json',
			success: function(data){
				console.log('success', data);
				$("body").css("background", "url("+data.urls.regular+")");

				var imageCredits="< Photo by <a href='"+data.user.links.html+"'>"+data.user.name+"</a> / <a href='https://unsplash.com/'>Unsplash ></a>";

				$("footer").html(imageCredits);
			},
			error: function(e){
				console.log('Error Loading Image', e);
			},

		});
	}

	function populate(data){

		$("#demo").empty();
		$("#demo").append(data.name);
		$("#demo").append('<br>');
		$("#demo").append('Temperature: ');
		$("#demo").append(data.main.temp);
		$("#demo").append(' Degrees');
		$("#demo").append('<br>');
		$("#demo").append(data.weather[0].main);
		$("#demo").append('<br>');
		$("#demo").append(data.weather[0].description);
		$("#demo").append('<br>');

		var iconImgCode = data.weather[0].icon;
		var iconTime = iconImgCode[iconImgCode.length-1];

		var icon = '<img src="http://openweathermap.org/img/w/'+iconImgCode+'.png">';
		var icon2 = '<i class="owf owf-'+data.weather[0].id+'-'+iconTime+'"></i>'
		$("#demo").append(icon);
		$("#demo").append(icon2);
	}

	$("#celsius").click(function(){
		units = 'metric';
		weather();
	});

	$("#fahrenheit").click(function(){
		units = 'imperial';
		weather();
	});

});


