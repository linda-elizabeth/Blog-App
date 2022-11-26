const express = require("express");
const cors = require("cors");
const app = new express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// VERY IMPORTANT
app.use(express.json());
const Postdata = require("./models/Postdata");

app.get("/api/posts", function (req, res) {
  Postdata.find({}).then(function (posts) {
    res.send(posts);
  });
});
app.post("/api/addpost", (req, res) => {
  var newpost = {
    title: req.body.title,
    content: req.body.content,
    authorID: req.body.userid,
    date: req.body.date,
    reactions: {
      thumbsup: req.body.reactions.thumbsup,
      wow: req.body.reactions.wow,
      heart: req.body.reactions.heart,
      rocket: req.body.reactions.rocket,
      coffee: req.body.reactions.coffee,
    },
  };
  var post = new Postdata(newpost);
  post
    .save()
    .then(function () {
      res.status(200).send("Post added!");
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log("Server ready at " + port);
});
