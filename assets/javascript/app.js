

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









// ================================END THOR SECTION================================= //


// ================================SAM SECTION========================================= //
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