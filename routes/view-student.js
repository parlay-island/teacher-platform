/**
 * Route to view a particular student.
 * Takes in playerID through the url.
 * Also requires the Parlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const viewStudentRoute = express.Router();
const LOCAL_BACKEND_API_URL = require('../config');

viewStudentRoute.get("/classroom/view-student/:playerId", function (req, res) {
    var playerId = req.params.playerId;

    res.render("pages/view-student", {
        playerId: playerId,
        baseAPIUrl: process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL
    });
});

module.exports = viewStudentRoute;