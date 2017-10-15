$.getJSON("https://ip-api.com/json/?callback=?", function(data) {

	//console.log(data);
  	$.getJSON("https://api.openweathermap.org/data/2.5/weather?lat={"+data.lat+"}&lon={"+data.lon+"}", weather );

});

function weather(weather){

	//console.log(weather);
	$("#demo").html(weather);

};


