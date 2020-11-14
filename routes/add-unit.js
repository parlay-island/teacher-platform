/**
 * Route for adding a unit.
 * Requires Parlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const addUnitRoute = express.Router();
const LOCAL_BACKEND_API_URL = require('../config');

addUnitRoute.get("/add-unit", function (req, res) {
    res.render("pages/add-unit", {
        baseAPIUrl: process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL
    })
});

module.exports = addUnitRoute;
