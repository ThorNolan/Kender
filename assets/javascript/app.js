

// TESTED API 


//$("#userSubmit").on("click", function() {

    


    var inputLocation = "london";//$("#userInput").val();
    var unit = "&units=imperial";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ inputLocation +"&APPID=f7d032505cb605fdfe25eebe96d9ab15";
 
     $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function (response) {
        
       console.log(response);

       
 
   })

//})



// We can get weather[0"] , rain[1h"] ,name , temperature wind speed and more from api response

