

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

// Eventbrite pull and ajax call
$(document).ready(function () {

    var numbersArr = ["one", "two", "three", "four", "five"];

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
            for (var i = 0; i < 5; i++) {
                var newSlide = makeEventCarousel(response.events[i], i);
                // $(".carousel-item").first().addClass("active");
                $(".appendEventsHere").append(newSlide);
                //    return(newSlide);
                //   $(".appendEventsHere").append('<div class="carousel-fixed-item"><img src="'+ response.events[i].logo.original.url+'" class="eventPic"><h1 class="eventName">'+response.events[i].name.text+'</h1><p class="eventText">'+response.events[i].description.text+'</p></div>')
            }
            if ($(".carousel").hasClass("initialized")) {
                $(".carousel").removeClass("initialized")
            }
            else {
                $('.carousel.carousel-slider').carousel({
                    fullWidth: true,
                    indicators: true
                });
            }

            // re-initialize my carousel after my for loop is done
            // $(".carousel.carousel-slider").carousel();

            // $(".carousel").addClass("initialized");

            // function for building carousel pieces 
            function makeEventCarousel(eventInfo, num) {

                //Build carousel pieces
                var newItem = $("<div>").addClass("carousel-item").attr("href", "#" + numbersArr[num] + "!");
                var eventImage = $("<img>").attr("src", eventInfo.logo.original.url);
                var eventTitle = $("<h2>").attr("text", eventInfo.name.text)
                var eventDescription = $("<p>").attr("text", eventInfo.description.text);

                newItem.append(eventImage);
                newItem.append(eventDescription);
                newItem.append(eventTitle);

                return newItem;
            }

        });
    })

    // $('.carousel.carousel-slider').carousel({
    //     fullWidth: true,
    //     indicators: true
    // });

})



//   $(".appendEventsHere").append('<div class="eventPic-holder"><img src="'+ response.events[i].logo.original.url+'" class="eventPic"></div><h1 class="eventName">'+response.events[i].name.text+'</h1><p class="eventText">'+response.events[i].description.text+'</p><hr>')




// ================================END THOR SECTION================================= //


// ================================SAM SECTION========================================= //









// ================================END SAM SECTION======================================= //