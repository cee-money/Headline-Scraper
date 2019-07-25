// Grab the articles as a json
$.getJSON("/articles", function(data) {
    if (data) {
       // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page

            var space = $("<br>")
            var card = $("<div>").addClass("card text-white bg-dark");
            var saveButton = $("<button>").addClass("btn btn-secondary btn-sm").text("Save Article").attr("data-id", data[i]._id);
            var cardHead = $("<div>").addClass("card-header");
            var cardBody = $("<div>").addClass("card-body");
            var title = $("<h4>").addClass("card-title").text(data[i].title);
            var summary = $("<p>").addClass("card-text").text("Summary to go right here");
            var link = $("<a>").addClass("text-light").attr("href", data[i].link).text("Link");

            $(cardBody).prepend(link);
            $(cardBody).prepend(summary);
            $(cardBody).prepend(title);
            $(card).prepend(cardBody);
            $(cardHead).prepend(saveButton);
            $(card).prepend(cardHead);
            $("#append-cards").append(card);
            $("#append-cards").append(space);
        } 
    } else {
        $("#append-cards").append("<h1>" + "Currently, no articles have been scraped." + "</h1>")
    }
});

$("#scrape-btn").on("click", function() {

// run the scrape route to get more articles
// display a modal noting data.length (number of articles scraped)

})

$("#save-btn").on("click", function() {

// toggled the saved field to true


})

$("#delete-btn").on("click", function() {

// toggled the saved field to false


})

$("#comment-btn").on("click", function() {

// display modal where comment is added (title and body, send to backend for a post route)

})

$("#save-comment").on("click", function() {

// add comment title and body to comment collection
// (title and body, send to backend for a post route)
    
})
