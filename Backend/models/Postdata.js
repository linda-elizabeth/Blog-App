const dotenv = require("dotenv").config();
//accessing mongoose package
const mongoose = require("mongoose");
//database connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//schema definition
const Schema = mongoose.Schema;
//constructor
const postSchema = new Schema({
  id: String,
  title: String,
  content: String,
  date: Date,
  authorID: String,
  reactions: {
    thumbsup: Number,
    wow: Number,
    heart: Number,
    rocket: Number,
    coffee: Number,
  },
});
//model creation
var Postdata = mongoose.model("postdata", postSchema);
//exporting the model
module.exports = Postdata;
