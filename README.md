# Headline-Scraper


Technologies used:
*Mongoose
*Express
*Node
*Cheerio
*Axios
*Morgan

A user can visit this site and click the Scrape New Articles button to scrape "news" from The Onion's website. Articles are then saved to a MongoDB collection. Articles can be saved as well as commented on . Comments are saved to another MongoDB collection, which is joined to the articles collection. Users can also delete comments.