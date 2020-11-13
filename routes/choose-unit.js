/**
 * Route for choosing a unit.
 * Requires Parlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const index = express.Router();
const LOCAL_BACKEND_API_URL = require('../config');

index.get("/", async function (req, res) {

    res.render("pages/choose-unit", {
        baseAPIUrl: process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL
    });
});

module.exports = index;