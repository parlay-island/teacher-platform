const express = require("express");
const registerRoute = express.Router();

const LOCAL_BACKEND_API_URL = require('../config');

registerRoute.get('/register', function (req, res) {
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/register", {
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = registerRoute;
