var express = require("express");
var path = require("path");
var app = express();

let PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setup public folder
app.use(express.static("./public"));

// set up routes
const chooseUnitRouter = require("./routes/choose-unit");
app.use("/", chooseUnitRouter);

const classroomRouter = require("./routes/classroom");
app.use("/classroom", classroomRouter);

const questionsRouter = require("./routes/questions");
app.use("/", questionsRouter);

const addQuestionRouter = require("./routes/add-question");
app.use("/", addQuestionRouter);

const gameRouter = require("./routes/game");
app.use("/", gameRouter);

// set up server
var server = app.listen(PORT, function () {
    console.log("Example app listening on port 3000!");
});
module.exports = server;
