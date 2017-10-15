$.getJSON("http://ip-api.com/json/?callback=?", function(data) {

	//console.log(data);
  	$.getJSON("api.openweathermap.org/data/2.5/weather?lat={"+data.lat+"}&lon={"+data.lon+"}&APPID={4823e0379d7d603fb2cbfdbad5c5842e}", weather );

});

function weather(weather){

	//console.log(weather);
	$("#demo").html(weather);

};


