


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

//-Atif-------Weather Search Detail Firebase Database---------------

// Initialize Firebase
        
/*var config = {
  apiKey: "AIzaSyC7sFmSCyeTZUQnW-wof8SBv4EV5uLvsxA",
  authDomain: "weather-project-d144f.firebaseapp.com",
  databaseURL: "https://weather-project-d144f.firebaseio.com",
  projectId: "weather-project-d144f",
  storageBucket: "weather-project-d144f.appspot.com",
  messagingSenderId: "455614600456"
};
firebase.initializeApp(config);
// Create a variable to reference the database.
var database = firebase.database();

      var weatherSearch = "";
      var eventsSearch = "";
      var musicPlaylist = "";

      */

//-Atif-------Weather Search By click on Submit---------------
var mood;
$(".row").hide();
$("#find-weather").on("click", function(event){

    event.preventDefault();
    
    $(".row").show();

    var inputLocation = $("#weatherInput").val();     
    
   

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ inputLocation +"&units=imperial&APPID=f7d032505cb605fdfe25eebe96d9ab15&cnt=3";
 
     $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function (response) {
        
       
       var apiResponse = response;
      var responseList = response.list;
      var todayRainStatus = responseList[0].weather[0].description;
       console.log(apiResponse);
      console.log(responseList);

       for(var i=0; i<responseList.length;i++){

        
        var cardNum = i+1;

        $("#card-"+cardNum).empty();
      
       var cityName = apiResponse.city.name;

       $("#card-"+cardNum).append("City Name:  "+ cityName);


       var country = apiResponse.city.country;
       $("#card-"+cardNum).append("<p> Country Name  :" + country + " </p>");

       var windSpeed = responseList[i].wind.speed;

       $("#card-"+cardNum).append("<p> Wind Speed  :" + windSpeed + " </p>");
       
       var pressure = responseList[i].main.pressure;
       $("#card-"+cardNum).append("<p> Pressure  :" + pressure + " </p>");

       var temperature = responseList[i].main.temp;
       $("#card-"+cardNum).append("<p>  Temperature (F)  :" + temperature + " </p>");
        
       var rainStatus = responseList[i].weather[0].description;
       $("#card-"+cardNum).append("<p> Rain Status  :" + rainStatus + " </p>");


            

           
            
       }
       
       
       // using information we gathered from the weather API, use that to assign a search term "mood" to a spotify playlist search
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
       

       spotifySearch();
   })

});











// ========================END ATIF SECTION====================================== //


// =================================THOR SECTION=================================== //

// Eventbrite pull and ajax call
$(document).ready(function () {

    // this array is for the href of the carousel items, which is necessary as it's how materialize keeps track of each slide
    var numbersArr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];

    // use this to make a random string, instead of the above numbersArr
    function makeid() {
        var newId = "";
        var idOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          newId += idOptions.charAt(Math.floor(Math.random() * idOptions.length));
      
        return newId;
      }
      

    // fix for potential cors error
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    // Function that triggers on submit of the form on the main page
    $(document).on("submit", ".event-form", function (event) {
        event.preventDefault()
        $(".carousel").empty();

        var paid = $("#paid").val()
        var eventName = $("#eventName").val()
        var location = $("#location").val()
        var isPopulated = false;

        $.ajax({
            url: 'https://www.eventbriteapi.com/v3/events/search/?q=' + eventName + '&price=' + paid + '&location.address=' + location + '&token=RQIFLDPFZLH3JYH4WYJQ',
            method: "GET"
        }).then(function (response) {

            console.log(response)
            
            for (var i = 0; i < 15; i++) {
                if ( response.logo.original.url[i] && response.logo.original.url[i] !== "null" && response.logo.original.url[i] !== "undefined") {
                    var newSlide = makeEventCarousel(response.events[i], i);
                    $(".appendEventsHere").append(newSlide);
                }
                // var newSlide = makeEventCarousel(response.events[i], i);
                // $(".appendEventsHere").append(newSlide);
            }

            // this prevents an error where the carousel can no longer initalize new items after it has already been initialized once
            if ($(".carousel").hasClass("initialized")) {
                $(".carousel").removeClass("initialized");
            } else {
                $('.carousel.carousel-slider').carousel({
                    fullWidth: true,
                    indicators: true
                });
            }

            // if( object && object !== "null" && object !== "undefined" ){
            //     doSomething();
            // }

            // Initialize anything with the .modal class
            $('.modal').modal();

            // Function for putting together all my carousel components
            function makeEventCarousel(eventInfo, num) {

                // Build carousel pieces
                var newItem = $("<div>").addClass("carousel-item").attr("href", "#" + numbersArr[num] + "!");
                var eventImage = $("<img>").attr("src", eventInfo.logo.original.url);
                var eventTitle = $("<h2>").attr("text", eventInfo.name.text);
                    eventTitle.addClass("text-light");

                // build modal trigger buttons for each carousel item
                var newModalBtnHolder = $("<div>").addClass("carousel-fixed-item center");
                var newModalBtn = $("<a>").addClass("waves-effect waves-light btn modal-trigger").attr("href", "#modal" + num).text("More Info");

                // build modal popups, triggered by the buttons above
                var newModalHolder = $("<div>").addClass("modal").attr("id", "modal" + num);
                var modalDiv = $("<div>").addClass("modal-content");
                var modalDescription = $("<p>").text(eventInfo.description.text);
                var modalFooterDiv = $("<div>").addClass("modal-footer");
                var modalFooterItem = $("<a>").addClass("modal-close waves-effect waves-green btn-flat").text("Close");
            

                // append my carousel pieces
                newItem.append(eventImage);
                newItem.append(eventTitle);
                newModalBtnHolder.append(newModalBtn);
                newItem.append(newModalBtnHolder);

                // append my modal button to each carousel item div
                modalDiv.append(modalDescription);
                modalFooterDiv.append(modalFooterItem);
                newModalHolder.append(modalDiv, modalFooterDiv);
                $(".modalHolder").append(newModalHolder);

                return newItem;
            }

        });
    })

})

// ================================END THOR SECTION================================= //


// ================================SAM SECTION========================================= //
//variables to be adjusted and attributed to the response from the wheather API



function spotifySearch() {
  var token = "BQDjYbdd3lG2b6qGNjwuWIOI4WXltvrh-yV-2-pQoQZKYRYGz-MQkUVYhpPLSvHu5UWLyWDSvY_uriZ-USe09zwoWpLDzGvUJDyn4vzryLrPUpmuqYQDrvzhvfIv8Bwn0w07KT52ZytV6h28oWuabJSce76BjRpwklX4pvutKn2J_V9ZeY_1evU59vTuLhg2u5xvQW7AK9eLcLlkDjFYy03BLBJ73LeFtISBZdYVI9JGNiEN6Y1XOdRnZVGK6VePhqeKSs1ENR6Dh9OwSSM"
  
  var type = "playlist";
  

  $.ajax({
    url: 'https://api.spotify.com/v1/search?type=' + type + '&query=' + mood,
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(function (response) {
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
      console.log(response);
      randomPlaylistInfo();
    })
  }

// using information we gathered from the weathe API, use that to assign a search term "mood" to a spotify playlist search
// if (todayRainStatus === "clear sky") {
//   mood = "happy";
// }

// if (todayRainStatus.includes("clouds")) {
//   mood = "chill";
// }
// if (todayRainStatus.includes("rain")) {
//   mood = "sad";
// }
// if (todayRainStatus.includes("thunderstsorm")) {
//   mood = "angry";
// }
// if (todayRainStatus.includes( "snow")) {
//   mood = "lo-fi";
// }

//global variables to make Ajax work


//Random Number Generator function 
function randomNumber(int) {
    return Math.floor(Math.random() * int);
}



//function to call on info from a random playlist








// ================================END SAM SECTION======================================= //