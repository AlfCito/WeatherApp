$(document).ready(function($){

	$.ajax({
		type: 'GET',
		url: 'https://maps.googleapis.com/maps/api/geocode/output?parameters',
		//url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCFWka7xeWSpSN_RVzKbl0lZyW4rZqOS9A',
		crossDomain: true,
		dataType: 'json',
		success: function(data){
			console.log('success', data);
		},
		error: function(e){
			console.log('error', e);
		}
	})
	/*
	$.getJSON("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCFWka7xeWSpSN_RVzKbl0lZyW4rZqOS9A", function(data) {

		console.log(data);
	  	//$.getJSON("api.openweathermap.org/data/2.5/weather?lat={"+data.lat+"}&lon={"+data.lon+"}&APPID=4823e0379d7d603fb2cbfdbad5c5842e?callback=weather");

	});

	function weather(weather){

		//console.log(weather);
		$("#demo").html(weather);

	};
	*/

});


