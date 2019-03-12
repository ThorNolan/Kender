

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









// ================================END SAM SECTION======================================= //