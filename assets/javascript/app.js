

// TESTED API 

var inputLocation = "San Francisco";


    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ inputLocation +"&APPID=f7d032505cb605fdfe25eebe96d9ab15";
 
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









// ================================END SAM SECTION======================================= //