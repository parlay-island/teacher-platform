/**
 * Route for logging in.
 * Requires Parlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const logInRoute = express.Router();
const LOCAL_BACKEND_API_URL = require('../config');

logInRoute.get('/', function (req, res) {

    res.render("pages/log-in", {
        baseAPIUrl: process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL
    });
});

module.exports = logInRoute;