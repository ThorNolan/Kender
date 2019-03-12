

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