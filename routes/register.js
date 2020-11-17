/**
 * Route for registering a new account.
 * Requires bParlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su 
 */
const express = require("express");
const registerRoute = express.Router();
const config = require('../config');

registerRoute.get('/register', function (req, res) {

    res.render("pages/register", {
        baseAPIUrl: process.env.BACKEND_API_URL || config.BACKEND_API_URL
    });
});

module.exports = registerRoute;
