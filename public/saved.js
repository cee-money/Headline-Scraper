// Grab the articles as a json
$.getJSON("/saved", function(data) {
    if (data.length > 0) {
        console.log("it hit it")
       // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page

            var space = $("<br>")
            var card = $("<div>").addClass("card text-white bg-dark");
            var commentBtn = $("<button>").addClass("btn btn-secondary btn-sm").text("Add Comment").attr("data-id", data[i]._id);
            var deleteBtn = $("<button>").addClass("btn btn-secondary btn-sm").text("Delete Article").attr("data-id", data[i]._id);
            var cardHead = $("<div>").addClass("card-header");
            var cardBody = $("<div>").addClass("card-body");
            var title = $("<h4>").addClass("card-title").text(data[i].title);
            var summary = $("<p>").addClass("card-text").text("Summary to go right here");
            var link = $("<a>").addClass("text-light").attr("href", data[i].link).text("Link");

            $(cardBody).prepend(link);
            $(cardBody).prepend(summary);
            $(cardBody).prepend(title);
            $(card).prepend(cardBody);
            $(cardHead).prepend(commentBtn);
            $(cardHead).prepend(deleteBtn);
            $(card).prepend(cardHead);
            $("#append-saved").append(card);
            $("#append-saved").append(space);
        } 
    } else {
        var message = $("<h1>").text("You have no saved articles.")
        $("#append-saved").append(message)
    }
});




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
    