

// TESTED API 


//$("#userSubmit").on("click", function() {

    


    var inputLocation = "london";//$("#userInput").val();
    var unit = "&units=imperial";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputLocation + "&APPID=f7d032505cb605fdfe25eebe96d9ab15";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    console.log(response);

})

//})



// We can get weather[0"] , rain[1h"] ,name , temperature wind speed and more from api response

// ============================LIAM SECTION===================================== //








// ==============================END LIAM SECTION=============================== //

// =============================ATIF SECTION==================================== //
$("#find-weather").on("click", function(event){

    event.preventDefault();

    var inputLocation = $("#weatherInput").val();      //"San Francisco";
    
   // for(var i=0; i<5;i++){

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ inputLocation +"&units=imperial&APPID=f7d032505cb605fdfe25eebe96d9ab15&cnt=5";
 
     $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function (response) {
        
       
       var apiResponse = response;
      var responseList = response.list;
       console.log(apiResponse);
      console.log(responseList);

       for(var i=0; i<responseList.length;i++){

       $(".display-weather").append("<h1> Weather Details</h1>");

       var cityName = apiResponse.city.name;

       $(".display-weather").append("<p> City Name:  "+ cityName+"</p>");

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
       
   })

});











// ========================END ATIF SECTION====================================== //


// =================================THOR SECTION=================================== //

  // Eventbrite pull and ajax call
  $(document).ready(function () {

    // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
    jQuery.ajaxPrefilter(function (options) {
      if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
      }
    });

    $(document).on("submit", ".event-form", function (event) {
      event.preventDefault()
      var paid = $("#paid").val()
      
      var eventName = $("#eventName").val()
      var location = $("#location").val()

      $.ajax({
        url: 'https://www.eventbriteapi.com/v3/events/search/?q=' + eventName + '&price=' + paid + '&location.address='+ location +'&token=RQIFLDPFZLH3JYH4WYJQ',
        method: "GET"
      }).then(function (response) {
        console.log(response)

        
        for (var i = 0; i < response.events.length ; i++) {
          console.log(i)
          $(".appendHere").append('<div class="eventPic-holder"><img src="'+ response.events[i].logo.original.url+'" class="eventPic"></div><h1 class="eventName">'+response.events[i].name.text+'</h1><p class="eventText">'+response.events[i].description.text+'</p><hr>')
        }

      });
    })



  })







// ================================END THOR SECTION================================= //


// ================================SAM SECTION========================================= //
//variables to be adjusted and attributed to the response from the wheather API
var sunny = "happy";
var rainy = "sad";
var cloudy = "chill";

//global variables to make Ajax work
var token = "BQCwJwcr0h6jJWwkpt_ygPjHcFmVw8iwdKhDBigr5Syi7LmCj5bAyCHpNnKvfPFWKSfgFAvJ5Zx3tJYathYQlBsarLH9Kgp_W9ERA4g8-uAkTdz5EbWQ2kaugmNNF1ulckv0AQxpmof7i1nxcRPTcYsL06Oy03BB9LvR5LCAFyJwupDFXFYYnsEXMToOJKjsTFr0-1mgOim4tXHNU6z0pblh7AoyMWY4eKtR3lRjBnt9aNCPtRGaR1UBEzZU3xjEq5CW6udsDZGSyGjw_Co";
var search = "happy";
var type = "playlist";

//Random Number Generator function 
function randomNumber(int) {
    return Math.floor(Math.random() * int);
}

//on click event
$(".button").on("click", function () {


    //ajax Call
    $.ajax({
        url: 'https://api.spotify.com/v1/search?type=' + type + '&query=' + search,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .then(function (response) {



            console.log(response);
            //links to useful items in the response object

            //function to call on info from a random playlist
            function randomPlaylistInfo() {

                //random number between 0 and 19 to target a random playlist
                var i = randomNumber(20)
                
                //variables to point to the Image, Link to playlist, and Playlist Name
                var playlists = response.playlists.items;
                var playlistImage = playlists[i].images[0].url;
                var playlistLinks = playlists[i].external_urls.spotify;
                var playlistName = playlists[i].name;


                //print the information
                console.log("Name: " + playlistName)
                console.log("Image: " + playlistImage)
                console.log("Playlist Link: " + playlistLinks)

              // displaying information onto a card
                $("#playlist-name").text("Playlist Name: " + playlistName);
                $("#playlist-link").attr("href", playlistLinks);
                $("#playlist-image").attr("src", playlistImage);

            }
            randomPlaylistInfo();


        })
})









// ================================END SAM SECTION======================================= //