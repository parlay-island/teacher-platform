/**
 * This file configures the NodeJS server
 * by configuring the relevant routes and setting up the 
 * folder from which to serve the static view pages.
 * 
 * @author: Jessica Su, Holly Ansel
 */

var express = require("express");
var path = require("path");
var app = express();

let PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// setup public folder
app.use(express.static("./public"));

// set up routes
const logInRouter = require("./routes/log-in");
app.use("/", logInRouter);

const chooseUnitRouter = require("./routes/choose-unit");
app.use("/choose-unit", chooseUnitRouter);

const classroomRouter = require("./routes/classroom");
app.use("/classroom", classroomRouter);

const questionsRouter = require("./routes/questions");
app.use("/", questionsRouter);

const addQuestionRouter = require("./routes/add-question");
app.use("/", addQuestionRouter);

const viewQuestionRouter = require("./routes/view-question");
app.use("/", viewQuestionRouter);

const viewStudentRouter = require("./routes/view-student");
app.use("/", viewStudentRouter);

const registerRouter = require("./routes/register");
app.use("/", registerRouter);

const addUnitRouter = require("./routes/add-unit");
app.use("/", addUnitRouter);

const gameRouter = require("./routes/game");
app.use("/", gameRouter);

const welcomeRouter = require("./routes/welcome");
app.use("/", welcomeRouter);

const aboutRouter = require("./routes/about");
app.use("/", aboutRouter);

// set up server
var server = app.listen(PORT, function () {
    console.log("App listening on port 3000!");
});

module.exports = server;
