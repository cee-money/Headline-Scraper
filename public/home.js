// Grab the articles as a json
function getArticles() {
    $.getJSON("/articles", function(data) {
        if (data.length > 0) {
           // For each one
            for (var i = 0; i < data.length; i++) {
                // Display the apropos information on the page
    
                var space = $("<br>")
                var card = $("<div>").addClass("card text-white bg-dark");
                var saveButton = $("<button>").addClass("btn btn-secondary btn-sm").text("Save Article").attr("data-id", data[i]._id).attr("id", "save-btn");
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

            $("#save-btn").on("click", function() {

                $.ajax({
                    method: "PUT",
                    url: "/save/" + $(this).attr("data-id")
                })
                .then(function(data) {
                    console.log("Saved article");
                })
            });

        } else {
            var message = $("<h1>").addClass("no-articles").text("You haven't scraped any articles yet.")
            $("#append-cards").append(message)    
        }
    });
};

getArticles();

$("#scrape-btn").on("click", function() {

    $(".no-articles").remove();

    $.ajax({
        method: "GET",
        url: "/scrape"
    })
      .then(function(data) {
        getArticles();
    })

// display a modal noting data.length (number of articles scraped)

});

