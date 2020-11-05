const express = require("express");
const logInRoute = express.Router();
const logInController = require("../api/log-in");

let TWO_HOURS = 1000 * 60 * 60 * 2;
const COOKIE_OPTIONS = {
    maxAge: TWO_HOURS,
    httpOnly: true,
};

logInRoute.get('/', function (req, res) {
    res.render("pages/log-in");
});

// proxy post request for log-in
logInRoute.post("/log-in", async function (req, res) {
    logInController.postLogIn("https://httpbin.org/post", req.body).then(function (response) {
        res.cookie("userId", "user", COOKIE_OPTIONS);
        res.send({
            status: 200 // send response status code instead
        });
    }).catch(function (error) {
        res.send({
            status: 500 // send response status code instead
        })
    });
});

module.exports = logInRoute;