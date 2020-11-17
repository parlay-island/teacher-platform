/**
 * Route for viewing student progress.
 * Requires Parlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const classroomRouter = express.Router();
const config = require('../config');

classroomRouter.get("/", function (req, res) {

    res.render("pages/classroom", {
        baseAPIUrl: process.env.BACKEND_API_URL || config.BACKEND_API_URL
    });
});

module.exports = classroomRouter;
