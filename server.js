var cheerio = require("cheerio");
var axios = require("axios");

var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/headline-scraper", { useNewUrlParser: true });


app.get("/scrape", function(req, res) {

    console.log("\n******************************************\n" +
            "Grabbing every article headline and link from the Onion website:" +
            "\n******************************************\n");

    // Making a request via axios for `onion.com`'s homepage
    axios.get("https://www.theonion.com").then(function(response) {

        // Load the body of the HTML into cheerio
        var $ = cheerio.load(response.data);

        // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
        $("div.cw4lnv-5").each(function(i, element) { 

            var result = {};

            // Save the text of the h4-tag as "title"
            result.title = $(element).find("a").children().text();

            // Find the h4 tag's parent a-tag, and save it's href value as "link"
            result.link = $(element).find("a").attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Articles.create(result)
            .then(function(dbArticles) {
            // View the added result in the console
            console.log(dbArticles);
            })
            .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
    });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    db.Articles.find({})
    .then(function(articles){
        res.json(articles)
    })
    .catch(function(err) {
        res.json(err);
    });
});

// Route for getting all Saved Articles from the db
app.get("/saved", function(req, res) {
    db.Articles.find({ saved: true })
    .then(function(saved){
        res.json(saved)
    })
    .catch(function(err) {
        res.json(err);
    });
});

// Route for toggling saved value to true when the saved button is pressed
app.put("/save/:id", function(req, res){
    console.log(req.params.id);
    db.Articles.findOneAndUpdate({ _id: req.params.id }, { $set: { saved : true } } )
    .then(function(updated){
        res.json(updated)
    })
    .catch(function(err) {
        res.json(err);
    })
})

// Route for toggling saved value to false when the delete button is pressed
app.put("/unsave/:id", function(req, res){
    console.log(req.params.id);
    db.Articles.findOneAndUpdate({ _id: req.params.id }, { $set: { saved : false } } )
    .then(function(updated){
        res.json(updated)
    })
    .catch(function(err) {
        res.json(err);
    })
})

// Route for getting comments on one article
app.get("/article/:id", function(req, res) {
    db.Articles.findOne({ _id: req.params.id })
    .populate("comments")
    .then(function(article) {
        res.json(article);
    })
    .catch(function(err) {
        res.json(err);
    });
});
  
// Route for saving an Article's associated Comment
app.post("/article/:id", function(req, res) {
    db.Comments.create(req.body)
    .then(function(dbComments) {
        return db.Articles.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComments._id } }, { new: true });
    })
    .then(function(comments) {
        res.json(comments);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// Route for deleting one comment associated with an article
app.delete("/delete/:id", function(req, res) {
    db.Comments.findOneAndDelete({ _id: req.params.id })
    .then(function(err){
        res.send(err)
    });
});


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
  
