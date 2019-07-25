// Grab the articles as a json
function getSaved() {
    $.getJSON("/saved", function(data) {
        if (data.length > 0) {
            console.log("it hit it")
           // For each one
            for (var i = 0; i < data.length; i++) {
                // Display the apropos information on the page
    
                var space = $("<br>")
                var card = $("<div>").addClass("card text-white bg-dark").attr("data-id", data[i]._id);
                var viewBtn = $("<button>").addClass("btn btn-secondary btn-sm").text("View Comments").attr("data-id", data[i]._id).attr("id", "view-btn");
                var commentBtn = $("<button>").addClass("btn btn-secondary btn-sm").text("Add Comment").attr("data-id", data[i]._id).attr("id", "comment-btn");
                var deleteBtn = $("<button>").addClass("btn btn-secondary btn-sm").text("Delete Article").attr("data-id", data[i]._id).attr("id", "delete-btn");
                var cardHead = $("<div>").addClass("card-header");
                var cardBody = $("<div>").addClass("card-body");
                var title = $("<h4>").addClass("card-title").text(data[i].title);
                var summary = $("<p>").addClass("card-text").text("Summary to go right here");
                var link = $("<a>").addClass("text-light").attr("href", data[i].link).text("Link");
    
                $(cardBody).prepend(link);
                $(cardBody).prepend(summary);
                $(cardBody).prepend(title);
                $(card).prepend(cardBody);
                $(cardHead).prepend(viewBtn);
                $(cardHead).prepend(commentBtn);
                $(cardHead).prepend(deleteBtn);
                $(card).prepend(cardHead);
                $("#append-saved").append(card);
                $("#append-saved").append(space);
            } 

            $("#delete-btn").on("click", function() {

            // toggled the saved field to false in collection
            // remove this article from the HTML?? or will it re-get and now this one won't be included?

            })

            $("#comment-btn").on("click", function() {

            // display modal where comment is added (title and body, send to backend for a post route)
                console.log("That worked!");
                $("#comment-modal").modal("toggle");

            })

            $("#view-btn").on("click", function (){

            // get route to get all comments on this article
            // open modal of all comments
             
            })

            $("#save-comment").on("click", function() {

            // add comment title and body to comment collection
            // (title and body, send to backend for a post route)
 
            })
        
        } else {
            var message = $("<h1>").text("You have no saved articles.")
            $("#append-saved").append(message)
        }
    });
    
}

getSaved();

    