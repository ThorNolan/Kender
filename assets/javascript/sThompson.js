
var mood;

function spotifySearch() {
  var token = "BQAZy3vJIfyYr6I8a0lkmVkkc6ztuj8WHRfzcoKHXyrUl9VXFaJtq5myR5xgFn_-8xPIs3tPERUMyHjDMHdSwcTkUGj-SrGgElYMm-KPM6-9cqxkPlKW5wSCjGhiXPUNb1FnH0q7D7tBbb9dfMrzHa_XNnfHp0I9BKQyLGBHFlv3tawKoFaYY8f0_TThc76wGNnJ_ysJVUXiJ4ygBLyls03GikUgwZHMThCrxiIpf0_jYA1ZP7N5L9tlA8Q-qRkhsHuWtTpB0F5IsY0XXYk"
  
  var type = "playlist";

  $.ajax({
    url: 'https://api.spotify.com/v1/search?type=' + type + '&query=' + mood,
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(function (response) {
      console.log(response);
    })
  }

$(document).on("click", "#find-weather", function (event) {

  event.preventDefault();

  var inputLocation = "Volgodonsk";      //"San Francisco";

  // for(var i=0; i<5;i++){

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputLocation + "&units=imperial&APPID=f7d032505cb605fdfe25eebe96d9ab15&cnt=1";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {


    var apiResponse = response;
    var responseList = response.list;
    console.log(apiResponse);
    console.log(responseList);

    var todayRainStatus = responseList[0].weather[0].description;
    console.log(todayRainStatus);

    for (var i = 0; i < responseList.length; i++) {

      $(".display-weather").append("<h1> Weather Details</h1>");

      var cityName = apiResponse.city.name;

      $(".display-weather").append("<p> City Name:  " + cityName + "</p>");

      var country = apiResponse.city.country;
      $(".display-weather").append("<p> Country Name  :" + country + " </p>");

      var windSpeed = responseList[i].wind.speed;

      $(".display-weather").append("<p> Wind Speed  :" + windSpeed + " </p>");

      var pressure = responseList[i].main.pressure;
      $(".display-weather").append("<p> Pressure  :" + pressure + " </p>");

      var temperature = responseList[i].main.temp;
      $(".display-weather").append("<p>  Temperature (F)  :" + temperature + " </p>");

      var rainStatus = responseList[i].weather[0].description;
      $(".display-weather").append("<p> Rain Status  :" + rainStatus + " </p>");


    }
    // using information we gathered from the weathe API, use that to assign a search term "mood" to a spotify playlist search
    if (todayRainStatus === "clear sky") {
      mood = "happy";
    }

    if (todayRainStatus.includes("clouds")) {
      mood = "chill";
    }
    if (todayRainStatus.includes("rain")) {
      mood = "sad";
    }
    if (todayRainStatus.includes("thunderstsorm")) {
      mood = "angry";
    }
    if (todayRainStatus.includes( "snow")) {
      mood = "lo-fi";
    }
    




//call the spotify search function
    spotifySearch();
  
});

})
