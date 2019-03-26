//__________________________________________________________
//GLOBAL VARIABLES
//__________________________________________________________

var names = ["Drake", "Chance the Rapper", "Kendrick Lamar"]

function showArtistName(){
  var dataAttribute = $(this).attr('data-name');
  alert(dataAttribute);
}


function renderButtons(){
  $("#buttons-view").empty();

  for(let i = 0; i < names.length; i++){
    var name = names[i];
    var button = $("<button>");
    button.addClass("name");
    button.attr("data-name", name );
   
    button.text(name);
    $("#buttons-view").append(button);
  }
}

$("#add-name").on("click", function(event){
  event.preventDefault();
  var artist = $("#name-input").val().trim();
  names.push(artist);
  renderButtons();
});

$(document).on("click", ".name", showArtistName);

renderButtons();
	
$("button").on("click", function() {
  var name = $(this).attr("data-name");
  var queryURL ="https://api.giphy.com/v1/gifs/search?api_key=7CE0qH3XM0cyJWgeLcJNfpmtwTcTn6d5&q="
                  + name + "&limit=25&offset=0&rating=G&lang=en ";
     

$.ajax({
  url: queryURL, 
  method: "GET"
})
.then(function(response){
  var results = response.data;

  for (var i = 0; i < results.length; i++) {
    var gifDiv = $("<div>");

    var rating = results[i].rating;

    var p = $("<p>").text("Rating: " + rating);

    var personImage = $("<img>");
    personImage.attr("src", results[i].images.fixed_height.url);

    gifDiv.prepend(p);
    gifDiv.prepend(personImage);

    $("#gifs-appear-here").prepend(gifDiv);
  }
 

 

});




});

