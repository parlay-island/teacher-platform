
const express = require("express");
const viewStudentRoute = express.Router();

const LOCAL_BACKEND_API_URL = require('../config');

viewStudentRoute.get("/classroom/view-student/:playerId", function (req, res) {
    var playerId = req.params.playerId;
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/view-student", {
        playerId: playerId,
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = viewStudentRoute;