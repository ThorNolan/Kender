
var token = "BQCI0EUgm-5M6xkdGzFJehw1HLFtex4-vNIYVHCYYTy7kfV-gOXVIQa2sNWl4lXkL_35Zv5b2PziS9SEfSMBBii_ANEeCFk9UOgOKSQDx284mFva34rWXeRJA4qNt8yR4wTpa4EMrJxrGZbioxrOKGE2ZRSiZa7tOuPxeHzNQXINJVsWSZbHaAF0SCsedyUYMlq9tk7xGxe7iTW7_XywmaYuQmrDaDhITPdJqbUj7qK5PvM6VOxG6yS3zL1EvXmKiyWB5AeDy5wWSob_wtI"
var search = $("#mood").val();
var type = "playlist";

$("button").on("click", function(event){
event.preventDefault();
    
    $.ajax({
      url: 'https://api.spotify.com/v1/search?type=' + type + '&query=' + search,
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then( function(response) {
      console.log(response);
    })
})