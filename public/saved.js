// Grab the articles as a json
function getSaved() {
    $.getJSON("/saved", function(data) {
        if (data.length > 0) {

           // For each one
            for (var i = 0; i < data.length; i++) {

                // Display the information on the page
                var space = $("<br>")
                var card = $("<div>").addClass("card text-white bg-dark").attr("data-id", data[i]._id);
                var viewBtn = $("<button>").addClass("btn btn-secondary btn-sm view").text("View Comments").attr("data-id", data[i]._id);
                var commentBtn = $("<button>").addClass("btn btn-secondary btn-sm comment").text("Add Comment").attr("data-id", data[i]._id);
                var deleteBtn = $("<button>").addClass("btn btn-secondary btn-sm delete").text("Delete Article").attr("data-id", data[i]._id);
                var cardHead = $("<div>").addClass("card-header");
                var cardBody = $("<div>").addClass("card-body");
                var title = $("<h4>").addClass("card-title").text(data[i].title);
                // var summary = $("<p>").addClass("card-text").text("Summary to go right here");
                var link = $("<a>").addClass("text-light").attr("href", data[i].link).attr("target", "_blank").text("View Article");
    
                $(cardBody).prepend(link);
                // $(cardBody).prepend(summary);
                $(cardBody).prepend(title);
                $(card).prepend(cardBody);
                $(cardHead).prepend(viewBtn);
                $(cardHead).prepend(commentBtn);
                $(cardHead).prepend(deleteBtn);
                $(card).prepend(cardHead);
                $("#append-saved").append(card);
                $("#append-saved").append(space);

            } 

            $(".delete").on("click", function() {

                $.ajax({
                    method: "PUT",
                    url: "/unsave/" + $(this).attr("data-id")
                })
                .then(function(data) {
                    console.log("Unsaved article");
                })

                document.location.reload() 

            });

            $(".comment").on("click", function() {

                $("#comment-modal").modal("toggle");

            });

            $(".save-comment").on("click", function() {

                // add comment title and body to comment collection
                // (title and body, send to backend for a post route)

                // title = $("#comment-title").val().trim();
                // body = $("comment-body").val().trim();

                // $.ajax({
                //     method: "POST",
                //     url: "/comment/" + $(this).attr("data-id")
                // })
                // .then(function(data) {
                //     console.log("Comment posted");
                // })
     
            });

            // associate these with the articles using the data-id somehow
            $(".view").on("click", function (){

                $("#view-comments").modal("toggle");

                if (!data.comments.length == []) {

                    for (var i = 0; i < data.comments.length; i++) {

                        var title = $("<h4>").text(`Title: ${data[i].comments[i].title}`);
                        var body = $("<p>").text(`Comment: ${data[i].comments[i].body}`);
                        var linebreak = $("<br>");
                        var divider = $("<hr>");

                        $("#append-comments-here").append(title);
                        $("#append-comments-here").append(body);
                        $("#append-comments-here").append(linebreak);
                        $("#append-comments-here").append(divider);
                    }

                } else {

                    var none = $("<h5>").text("This article has no comments.");
                    $("#append-comments-here").append(none);

                }
            });

        } else {
            var message = $("<h1>").text("You have no saved articles.");
            $("#append-saved").append(message);
        }
    });
}

getSaved();
