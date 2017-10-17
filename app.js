$(document).ready(function($){
	
	var lat ='';
	var lon ='';

	$.ajax({
		type: 'GET',
		url: "http://ip-api.com/json",
		crossDomain: true,
		dataType: 'json',
		success: function(data){
			console.log('success', data);
			lat = data.lat;
			lon = data.lon;
			console.log('lat: '+ lat + 'lon: '+ lon );

			weather();
		},
		error: function(e){
			console.log('Error Finding your Location', e);
		}
	});
	
	function weather(weather){

		var appKey = "4823e0379d7d603fb2cbfdbad5c5842e";

		$.ajax({
			type: 'GET',
			url: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+appKey+"",
			crossDomain: true,
			dataType: 'json',
			success: function(data){
				console.log('success', data);
			},
			error: function(e){
				console.log('error', e);
			}
		});
	};	

});


