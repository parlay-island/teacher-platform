const express = require("express");
const registerRoute = express.Router();

const LOCAL_BACKEND_API_URL = require('../config');

registerRoute.get('/register', function (req, res) {

    res.render("pages/register", {
        baseAPIUrl: process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL
    });
});

module.exports = registerRoute;
