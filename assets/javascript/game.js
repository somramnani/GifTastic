//__________________________________________________________
//GLOBAL VARIABLES
//__________________________________________________________

var names = ["Superman", "Batman", "Wonder-Woman", "Green Arrow", "Iron Man", "Spider-Man", "Deadpool"];

// A function that creates the buttons 
function renderButtons(){
  $("#buttons-view").empty();
  
  // Loops through the names array and creates the buttons.
  for(let i = 0; i < names.length; i++){
    
    // Grabs one value from the array and saves it as a variable.
    var name = names[i];
    
    // Creates a button  
    var button = $("<button>");
    
    // Adds the a class called name to the buttons.
    button.addClass("name");
    
    // Sets the data-name to each individual name from the names array
    button.attr("data-name", name );
    
    // Makes each name in the names array a button
    button.text(name);
    $("#buttons-view").append(button);
  }
}

$("#add-name").on("click", function(event){
  
  // Makes the submit button not restore to default
  event.preventDefault();

  //Grabs the users input
  var name = $("#name-input").val().trim();
  
  //Puts the users input in the names array
  names.push(name);

  //Calls the function that creates the buttons so that it will make the user input a button as well
  renderButtons();
});

//Calls the function that creates the buttons
renderButtons();
	
$(".name").on("click", function() {
  
  // Sets the gifs-div to empty 
  $("#gifs-appear-here").empty();

  var name = $(this).attr("data-name");
  
  // Saves the API link in a variable
  var queryURL ="https://api.giphy.com/v1/gifs/search?api_key=7CE0qH3XM0cyJWgeLcJNfpmtwTcTn6d5&q="
                  + name + "&limit=25&offset=0&rating=G&lang=en";

  // Makes a request from the API
  $.ajax({
    url: queryURL, 
    method: "GET"
  })
  
  .then(function(response){
    var results = response.data;

    // Loops through the API JSON
    for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div>");
    
      // Saving the rating from the API in a variable called rating
      var rating = results[i].rating;

      // Creates a paragraph tag so the rating can be displayed
      var p = $("<p>").text("Rating: " + rating);

      // Creates an image tag for the GIFS
      var personImage = $("<img>");
    
      // Creates a class for the image tag
      personImage.addClass("gifImage ");

      // Gives the source of the GIFS and makes it still from the start
      personImage.attr("src", results[i].images.fixed_height_still.url);
    
      // Creates the data-state to still
      personImage.attr("data-state", "still");

      // Adds the data animate data-attribute to the image tags  
      personImage.attr("data-still", results[i].images.fixed_height_still.url);

      // Adds the data animate data-attribute to the image tags  
      personImage.attr("data-animate", results[i].images.fixed_height.url);

      // Adds the rating paragraph tag and the GIFS before the GIFDIV
      gifDiv.prepend(p);
      gifDiv.prepend(personImage);
    
      // Places the GIFS under the div 
      $("#gifs-appear-here").prepend(gifDiv);
    }
     
    $('.gifImage').on("click", function(){
    
      // Grabs the data-attributes and saves them in a variable
      var state = $(this).attr("data-state");
      var animate = $(this).attr("data-animate")
      var still = $(this).attr("data-still")

      // If statement for if the state is still and not animating then animate
      if(state === 'still'){
        $(this).attr("src", animate);
        $(this).attr("data-state", 'animate');
      }
      //Else-If statement if the state is aniimating and not still then change to still
      else if(state === 'animate'){
        $(this).attr('src', still)
        $(this).attr('data-state', 'still')
      }
    })
  
  });
});

