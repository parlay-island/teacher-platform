var express = require("express");
var path = require("path");
var app = express();

let PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//setup public folder
app.use(express.static("./public"));

app.get("/", function (req, res) {
    res.render("pages/index");
});
var server = app.listen(PORT, function () {
    console.log("Example app listening on port 3000!");
});

module.exports = server;
