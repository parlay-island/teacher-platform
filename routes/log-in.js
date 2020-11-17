/**
 * Route for logging in.
 * Requires Parlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const logInRoute = express.Router();
const config = require('../config');

logInRoute.get('/log-in', function (req, res) {

    res.render("pages/log-in", {
        baseAPIUrl: process.env.BACKEND_API_URL || config.BACKEND_API_URL
    });
});

module.exports = logInRoute;