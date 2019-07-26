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
                var link = $("<a>").addClass("text-light").attr("href", data[i].link).attr("target", "_blank").text("View Article");
    
                $(cardBody).prepend(link);
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
                $("#save-comment").attr("data-id", $(this).attr("data-id"));

            });

            $("#save-comment").on("click", function() {

                $.ajax({
                    method: "POST",
                    url: "/article/" + $(this).attr("data-id"),
                    data: JSON.stringify({
                        title: $("#comment-title").val().trim(),
                        body: $("#comment-body").val().trim()
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                })
                .then(function(data) {
                    console.log("Comment posted");
                    $("#comment-modal").modal("toggle");
                    $("#comment-title").val("");
                    $("#comment-body").val("");
                })
     
            });

            $(".view").on("click", function (){

                $("#append-comments-here").empty();
                $("#view-comments").modal("toggle");

                var ID = $(this).attr("data-id");

                $.getJSON("/article/" + ID , function(data) {

                    if (!data.comments.length == []) {

                        // $("#append-comments-here").empty();

                        for (var i = 0; i < data.comments.length; i++) {

                            var commentDiv = $("<div>").attr("id", data.comments[i]._id);
                            var removeBtn = $("<button>").addClass("btn btn-danger btn-sm remove-comment").attr("data-id", data.comments[i]._id).text("X");
                            var title = $("<h5>").text(`${data.comments[i].title}`);
                            var body = $("<p>").text(`${data.comments[i].body}`);
                            var linebreak = $("<br>");
                            var divider = $("<hr>");

                            $("#append-comments-here").append(commentDiv);
                            $(commentDiv).append(title);
                            $(title).append(removeBtn);
                            $(commentDiv).append(body);
                            $(commentDiv).append(divider);
                            $(commentDiv).append(linebreak);
                        }
                    
                        $(".remove-comment").on("click", function() {
                        
                            $.ajax({
                                method: "DELETE",
                                url: "/delete/" + $(this).attr("data-id")
                            })
                            .then(function(data) {
                                console.log("Deleted comment");
                            })

                            $(`[id=${$(this).attr('data-id')}]`).remove();
                            
                        });

                    } else {

                        var none = $("<h5>").text("This article has no comments.");
                        $("#append-comments-here").append(none);

                    }
                });
            });

        } else {
            var message = $("<h1>").text("You have no saved articles.");
            $("#append-saved").append(message);
        }
    });
};

getSaved();
