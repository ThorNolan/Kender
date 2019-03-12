
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
       
   })

});



// ========================END ATIF SECTION====================================== //


// =================================THOR SECTION=================================== //

// Eventbrite pull and ajax call
$(document).ready(function () {

    // this array is for the href of the carousel items, which is necessary as it's how materialize keeps track of each slide
    var numbersArr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];

    // fix for potential cors error
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
            url: 'https://www.eventbriteapi.com/v3/events/search/?q=' + eventName + '&price=' + paid + '&location.address=' + location + '&token=RQIFLDPFZLH3JYH4WYJQ',
            method: "GET"
        }).then(function (response) {
            console.log(response)
            // response.events.length
            for (var i = 0; i < 15; i++) {
                var newSlide = makeEventCarousel(response.events[i], i);
                $(".appendEventsHere").append(newSlide);
            }
            if ($(".carousel").hasClass("initialized")) {
                $(".carousel").removeClass("initialized");
            } else {
                $('.carousel.carousel-slider').carousel({
                    fullWidth: true,
                    indicators: true
                });
            }

            $('.modal').modal();

            // function for building carousel pieces 
            function makeEventCarousel(eventInfo, num) {

                //Build carousel pieces
                var newItem = $("<div>").addClass("carousel-item").attr("href", "#" + numbersArr[num] + "!");
                var eventImage = $("<img>").attr("src", eventInfo.logo.original.url);
                var eventTitle = $("<h2>").attr("text", eventInfo.name.text)
                // var eventDescription = $("<p>").attr("text", eventInfo.description.text);

                // build modal trigger buttons for each carousel item
                var newModalBtnHolder = $("<div>").addClass("carousel-fixed-item center");
                var newModalBtn = $("<a>").addClass("waves-effect waves-light btn modal-trigger").attr("href", "#modal" + num).text("More Info");

                // build modal popups, triggered by the buttons above
                var newModalHolder = $("<div>").addClass("modal").attr("id", "modal" + num);
                var modalDiv = $("<div>").addClass("modal-content");
                var modalDescription = $("<p>").text(eventInfo.description.text);
                var modalFooterDiv = $("<div>").addClass("modal-footer");
                var modalFooterItem = $("<a>").addClass("modal-close waves-effect waves-green btn-flat").text("Close");

        // <div id="modal1" class="modal">
        // <div class="modal-content">
        // <h4>Modal Header</h4>
        // <p>A bunch of text</p>
        // </div>
        // <div class="modal-footer">
        // <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        // </div>
        // </div>
            

                // append my carousel pieces
                newItem.append(eventImage);
                // newItem.append(eventDescription);
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

  var todayRainStatus = responseList[0].weather[0].description;
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

//global variables to make Ajax work
var token = "BQC8H2CVdjDHdiAm7Kc2mfFvH-AZQuQE86TuoY5B81CuBVHxzHf9Ul00NLvGxN7_KAcZqzpwHi0Dwj8hRZNPXTX1VsS80nOAlrgB5kX4zxU-IL1K1wtJVvj3qMdd13gZf64xi54hi7XStOhs-fVJlDJX-yZq_ff8QcB-Pr6S9dlmuEZoA2p9e5H0vC51FPy2Pab9rTx50Zd5hEP-CErRlYsqbVp-UXoWeJN4Lkax8B9Bq8URDDJirpA433uZfy3Myxf4U2It1IaMKM9TEGk";
var search = "chill";
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