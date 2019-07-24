var cheerio = require("cheerio");
var axios = require("axios");

// First, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link from the Onion website:" +
            "\n******************************************\n");

// Making a request via axios for `onion.com`'s homepage
axios.get("https://www.theonion.com").then(function(response) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(response.data);

  // Empty array to save our scraped data
  var results = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $("div.cw4lnv-5").each(function(i, element) {   //div.cw4lnv-5 jbXSRk"

    // Save the text of the h4-tag as "title"
    var title = $(element).find("a").children().text();

    // Find the h4 tag's parent a-tag, and save it's href value as "link"
    var link = $(element).find("a").attr("href");

    // Make an object with data we scraped for this h4 and push it to the results array
    results.push({
      title: title,
      link: link
    });
  });

  // After looping through each h4.headline-link, log the results
  console.log(results);
});
