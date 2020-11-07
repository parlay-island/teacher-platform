const express = require("express");
const logInRoute = express.Router();

const LOCAL_BACKEND_API_URL = require('../config');

logInRoute.get('/', function (req, res) {
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/log-in", {
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = logInRoute;