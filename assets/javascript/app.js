

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

var responseTree = {
   hot: { // above 75 degrees
    sunny: "hot+sunny",
    cloudy: "hot+cloudy",
    rainy: "rainy",
   },
   warm: { // above 50 degrees
        sunny: 
       cloudy:
       rainy:
   },
   chilly: { // above 35 degrees       
       sunny:
       cloudy:
       rainy:
       snowy:
   }
   cold: { // below 35 degrees       
    sunny:
    cloudy:
    rainy:
    snowy:
}
}







// ==============================END LIAM SECTION=============================== //

// =============================ATIF SECTION==================================== //










// ========================END ATIF SECTION====================================== //


// =================================THOR SECTION=================================== //









// ================================END THOR SECTION================================= //


// ================================SAM SECTION========================================= //









// ================================END SAM SECTION======================================= //