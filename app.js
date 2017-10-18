$(document).ready(function($){

	var images = {
		"clearSkyDay": 			"https://unsplash.com/photos/uivWDK2Ifrg",
		"clearSkyNight": 			"https://unsplash.com/photos/weuWmzv7xnU",
		"fewCloudsDay" : 			"https://unsplash.com/photos/f5_lfi2S-d4",
		"fewCloudsNight" : 		"https://unsplash.com/photos/w8yLxjJVn4U",
		"scatteredCloudsDay" : 	"",
		"scatteredCloudsNight" : 	"",
		"broken-clouds-day" : 		"",
		"broken-clouds-night" : 	"",
		"shower-rain-day" : 		"",
		"shower-rain-night" : 		"",
		"rain-day" : 				"",
		"rain-night" : 				"",
		"thunderstorm-day" : 		"",
		"thunderstorm-night" : 		"",
		"snow-day" : 				"",
		"snow-night" : 				"",
		"mist-day" : 				"",
		"mist-night" : 				""
	}
	
	var lat = '';
	var lon = '';
	var units = 'metric';

	var location = $.ajax({
		type: 'GET',
		url: "http://ip-api.com/json",
		crossDomain: true,
		dataType: 'json',
		success: function(data){
			console.log('success', data);
		},
		error: function(e){
			console.log('Error Finding your Location', e);
		}
	});

	location.done(function(data){
		lat = data.lat;
		lon = data.lon;
		weather();
	});
	
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
			populate(data);
		});
	};	

	function populate(data){

		$("body").css("background", "url("+images.clearSkyNight+")");

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


