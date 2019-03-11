

// TESTED API 

var inputLocation = "San Francisco";


var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputLocation + "&APPID=f7d032505cb605fdfe25eebe96d9ab15";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    console.log(response);

})

// We can get weather[0"] , rain[1h"] ,name , temperature wind speed and more from api response

// ============================LIAM SECTION===================================== //








// ==============================END LIAM SECTION=============================== //

// =============================ATIF SECTION==================================== //










// ========================END ATIF SECTION====================================== //


// =================================THOR SECTION=================================== //

// initializer for parallax effect
(function($){
    $(function(){
  
      $('.sidenav').sidenav();
      $('.parallax').parallax();
  
    }); // end of document ready
  })(jQuery); // end of jQuery name space

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
var 

//global variables to make Ajax work
var token = "BQACzEOHfP2J3FNokH2pOUrIn5ffydy8LWpb-ErfudMBZgEtMI-bW9VLuZ8ne9tA0dkX2SNlirYfyhE1QY_pERmo60EbNUWpBGbEkQaX9v92LUHAsGvxPJrlOTuMZ-8BFjXstF8l4fM7WH2fjBcWaUngRlpIh__UggSbzpsomM3BeMEzRE9CGAGT5FRJX5Fj-NhPbQdxV5iVfnmQgMO4WJltncYOSePIf8OE7U5AYv9zFxlidyhchQ9yaZWnI2wTxhse4SJegnoQd7VfwPw"
var search = "happy"
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

            }
            randomPlaylistInfo();


        })
})









// ================================END SAM SECTION======================================= //