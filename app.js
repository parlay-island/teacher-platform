var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var app = express();

const LOCAL_BACKEND_API_URL = require('./config');
let PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// setup public folder
app.use(express.static("./public"));
app.use(cookieParser());

// set up backend API endpoint
app.locals.baseApiURL = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

// set up routes
const logInRouter = require("./routes/log-in");
app.use("/log-in", logInRouter);

const chooseUnitRouter = require("./routes/choose-unit");
app.use("/", chooseUnitRouter);

const classroomRouter = require("./routes/classroom");
app.use("/classroom", classroomRouter);

const questionsRouter = require("./routes/questions");
app.use("/", questionsRouter);

const addQuestionRouter = require("./routes/add-question");
app.use("/", addQuestionRouter);

const viewQuestionRouter = require("./routes/view-question");
app.use("/", viewQuestionRouter);

const gameRouter = require("./routes/game");
app.use("/", gameRouter);

const viewStudentRouter = require("./routes/view-student");
app.use("/", viewStudentRouter);

// set up server
var server = app.listen(PORT, function () {
    console.log("Example app listening on port 3000!");
});

module.exports = server;
