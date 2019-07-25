var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var CommentsSchema = new Schema({
  title: String,
  body: String
});

// This creates our model from the above schema, using mongoose's model method
var Comments = mongoose.model("Comments", CommentsSchema);

// Export the Note model
module.exports = Comments;
