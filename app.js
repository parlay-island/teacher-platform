var express = require("express");
var path = require("path");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var app = express();

let PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setup public folder
app.use(express.static("./public"));

// using cookies for log in authentication
app.use(cookieParser());
app.use(express.json());

const redirectLogin = (req, res, next) => {
    if (! req.cookies.userId) {
        res.redirect('/') // route for log-in
    } else {
        next();
    }
}

// set up routes
const logInRouter = require("./routes/log-in");
app.use("/", logInRouter);

const chooseUnitRouter = require("./routes/choose-unit");
app.use("/choose-unit", redirectLogin, chooseUnitRouter);

const classroomRouter = require("./routes/classroom");
app.use("/classroom", redirectLogin, classroomRouter);

const questionsRouter = require("./routes/questions");
app.use("/", redirectLogin, questionsRouter);

const addQuestionRouter = require("./routes/add-question");
app.use("/", redirectLogin, addQuestionRouter);

const viewQuestionRouter = require("./routes/view-question");
app.use("/", redirectLogin, viewQuestionRouter);

const gameRouter = require("./routes/game");
app.use("/", redirectLogin, gameRouter);

const viewStudentRouter = require("./routes/view-student");
app.use("/", redirectLogin, viewStudentRouter);

// set up server
var server = app.listen(PORT, function () {
    console.log("Example app listening on port 3000!");
});

module.exports = server;
