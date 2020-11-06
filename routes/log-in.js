const express = require("express");
const logInRoute = express.Router();

logInRoute.get('/', function (req, res) {
    res.render("pages/log-in", {
        baseAPIUrl: req.app.locals.baseApiURL
    });
});

module.exports = logInRoute;