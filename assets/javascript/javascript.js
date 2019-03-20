// Initial array of Holidays
var holidays = ["Christmas", "Thanksgiving", "Easter", "Fourth Of July"];

// ========================================================


function displayGif(){

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    gif + "&api_key=U10wOC5gBJhiCdDSObYjMCpzIOC154Bp&limit=10";

    $.ajax({
        url:queryURL,
        method:"GET"
    })
    .then(function(response){
        console.log(response);
        var results = response.data;

        for (var i = 0; i<results.length; i++){
            var gifDiv = $("<div class=gifs>");
            var rating = results[i].rating;
            var imageUrl = response.data[i].images.fixed_height.url;
            var imageStillUrl = response.data[i].images.fixed_height_still.url;
            var p = $("<p>").text("Rating:"+ rating);
            var holidayImage = $("<img class='gif'>");
            holidayImage.attr("src", results[i].images.fixed_height.url);

                holidayImage.attr('src', imageStillUrl);
                holidayImage.attr('alt', 'gif');
                holidayImage.attr('data-state', 'still');
                holidayImage.attr('data-still', imageStillUrl);
                holidayImage.attr('data-animate', imageUrl);
            
            gifDiv.prepend(p);
            gifDiv.prepend(holidayImage);

            $("#gifs-appear-here").prepend(gifDiv);
            checkState();
        
        
        }
    });


}


function renderButtons(){ 

    $("#buttons-view").empty();

    for (var i = 0; i < holidays.length; i++){

        var newButton = $('<button class="btn btn-info">') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        newButton.addClass("holiday"); // Added a class 
        newButton.attr("data-name", holidays[i]); // Added a data-attribute
        newButton.text(holidays[i]); // Provided the initial button text
        $("#buttons-view").append(newButton); // Added the button to the HTML
    }
}

$("#addHoliday").on("click", function(event){
    event.preventDefault();

    var holiday = $("#holidayInput").val().trim();

    holidays.push(holiday);
    
    renderButtons();

    return false;
});


$(document).on("click", ".holiday", displayGif);

renderButtons();

$("img").on("click", function(){
    var state = $(this).attr("data-state");
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state","still");
        
      }
});

function checkState(){
  $('img').on('click', function(){
  var state = $(this).attr('data-state'); 
  if (state == 'still'){
  $(this).attr('src', $(this).data('animate'));
  $(this).attr('data-state', 'animate');
  }else{
  $(this).attr('src', $(this).data('still'));
  $(this).attr('data-state', 'still');
}

    });
};
