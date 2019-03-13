

// ============================LIAM SECTION===================================== //








// ==============================END LIAM SECTION=============================== //

// =============================ATIF SECTION==================================== //

    var mood;

    //----hide all cards with startup--------- 

    $(".card").hide();

    //--------Weather Search By click on Submit---------------
    
    $("#find-weather").on("click", function(event){

    event.preventDefault();
    
    $(".card").show();

    var inputLocation = $("#weatherInput").val();     
    
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ inputLocation +"&units=imperial&APPID=f7d032505cb605fdfe25eebe96d9ab15&cnt=3";
 
     $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function (response) {
        
      // Weather API response store in different variable as per requirement      
       var apiResponse = response;
      var responseList = response.list;
      // todayRainStatus grap the status of rain from api.
      var todayRainStatus = responseList[0].weather[0].description;

      
      //console.log(apiResponse);
      //console.log(responseList);

      // using for loops grabbing the weather forcast as per response array length
       for(var i=0; i<responseList.length;i++){

        // variable CardNum adding i+1 for display the forcast result in different cards
        var cardNum = i+1;
         // initialize the card as empty
        $("#card-"+cardNum).empty();
      
        // Store the api response city name in variable cityName
       var cityName = apiResponse.city.name;
        // appending the api response into web
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
    var numbersArr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];

    // use this to make a random string to be used as a unique id, instead of the above numbersArr
    function makeID() {
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


    // Function that triggers on submit of the form on the main page
    $(document).on("submit", ".event-form", function (event) {
        event.preventDefault()
        $(".carousel").empty();

        var paid = $("#paid").val()
        var eventName = $("#eventName").val()
        //var location = $("#location").val()
        var location = $("#weatherInput").val()

        // ajax call to the eventbrite API
        $.ajax({
            url: 'https://www.eventbriteapi.com/v3/events/search/?q=' + eventName + '&price=' + paid + '&location.address=' + location + '&token=RQIFLDPFZLH3JYH4WYJQ',
            method: "GET"
        }).then(function (response) {

            //console.log(response)
            
            for (var i = 0; i < 20; i++) {
                // make sure that the response has an image (at events.logo) before adding it to the carousel
                if ( response.events[i].logo && response.events[i].logo.original.url !== "null" && response.events[i].logo.original.url !== "undefined") {
                    var newSlide = makeEventCarousel(response.events[i], i);
                    $(".appendEventsHere").append(newSlide);
                }
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

            // Initialize anything with the .modal class
            $('.modal').modal();

            // Function for putting together all my carousel components
            function makeEventCarousel(eventInfo, num) {

                // Build carousel pieces
                var newItem = $("<div>").addClass("carousel-item").attr("href", "#" + numbersArr[num] + "!");
                var eventImage = $("<img>").attr("src", eventInfo.logo.original.url);
                var eventTitle = $("<h2>").text(eventInfo.name.text);

                // build modal trigger buttons for each carousel item
                var newModalBtnHolder = $("<div>").addClass("carousel-fixed-item center");
                var uniqueModalId = makeID();
                var newModalBtn = $("<a>").addClass("waves-effect waves-light indigo indigo-darken-3 light-text btn modal-trigger").attr("href", "#modal" + uniqueModalId).text("More Info");

                // build modal popups, triggered by the buttons above by same-id attachment
                var newModalHolder = $("<div>").addClass("modal").attr("id", "modal" + uniqueModalId);
                var modalDiv = $("<div>").addClass("modal-content");
                var modalDescription = $("<p>").text(eventInfo.description.text);
                var modalFooterDiv = $("<div>").addClass("modal-footer");
                var modalFooterItem = $("<a>").addClass("modal-close waves-effect waves-red btn-flat").text("Close");
            

                // append my carousel pieces
                newItem.append(eventImage);
                newItem.prepend(eventTitle);
                newModalBtnHolder.append(newModalBtn);
                newItem.append(newModalBtnHolder);


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



function spotifySearch() {
  var token = "BQDgGRWgZLRxGLJ7YhevF-QcITwjH6U4nB2R8n5w7nuLR7fBkjqQ01V399eKZCBMCi5xJpGO_azLekFJhNE7g0hO9ss6C8zB-87MmzvrtEU6qUdjrzqQ8P65KfYaNAJtAdisWDnXYrsXOXhQhSC1goqaPAqFfs6T94zj2Po3QCVVYmUT0Z5g6G3fTyG-iZUzaX1fxImx-Hhg0yOlIWRMC6URJlSK1OV5gmEBj3BtOtQ5UP-GNcdER8huTU8nE0-jYmtHnZmR9TwjQ0MGVcs"

  var type = "playlist";
  var accessToken = "BQAoA0tEEWMoSpiBKOJ4YTDkIp8vXx48j1MRfOHqaKzqsmCi_QwLjG2EbQmw0VAlRpGbHJ8RI2OpLNaSKbxiio3RqpbQEjxvs-Y3pM0kCQbhuoi8K2VyRH5F4FFiP4rCqdZhbr_qPWGSzqgPtsLYoi0vcdj79KGCCuT3lZk9EYZpddQ07-3mAguF_IUx3c0"
  var refreshToken = "AQBPGEZ_-JZI17n-Khd0DAf7l1_KIxgU3NpISIJf9fLNKshcspuHU-U85UCv_-sdVw5ZBkEPDHizgxyFv0GMpMUz7uVfosb3B6pBvqjcT-ywXQuK4WUnlfPsxZYj7zVmYfs37Q"

  $.ajax({
    url: 'https://api.spotify.com/v1/search?type=' + type + '&query=' + mood,
    headers: {
      "access_token": accessToken,
   "token_type": "Bearer",
   "scope": "user-read-private user-read-email",
   "expires_in": 3600,
   "refresh_token": refreshToken
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
      var playlistID = playlists[i].id


      //print the information
      // console.log("Name: " + playlistName)
      // console.log("Image: " + playlistImage)
      // console.log("Playlist Link: " + playlistLinks)

      // displaying information onto a card
      $("#playlist-name").text("Playlist Name: " + playlistName);
      $("#playlist-link").attr("href", playlistLinks);
      $("#playlist-image").attr("src", playlistImage);
      $("#spotify-player").attr("src", "https://open.spotify.com/embed/playlist/" + playlistID);

    }
    // console.log(response);
    randomPlaylistInfo();
  })
}




//Random Number Generator function 
function randomNumber(int) {
  return Math.floor(Math.random() * int);
}

$("#happy").on("click", function () {
  mood = "happy"
  spotifySearch();
})

$("#sad").on("click", function () {
  mood = "sad"
  spotifySearch();
})

$("#chill").on("click", function () {
  mood = "chill"
  spotifySearch();
})

$("#angry").on("click", function () {
  mood = "angry"
  spotifySearch();
})

$("#lo-fi").on("click", function () {
  mood = "lo-fi"
  spotifySearch();
})



//function to call on info from a random playlist








// ================================END SAM SECTION======================================= //