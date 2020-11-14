/**
 * Route for viewing student progress.
 * Requires Parlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const classroomRouter = express.Router();
const LOCAL_BACKEND_API_URL = require('../config');

classroomRouter.get("/", function (req, res) {

    res.render("pages/classroom", {
        baseAPIUrl: process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL
    });
});

module.exports = classroomRouter;
