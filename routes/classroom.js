
const express = require("express");
const classroomRouter = express.Router();

const LOCAL_BACKEND_API_URL = require('../config');

classroomRouter.get("/", function (req, res) {
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/classroom", {
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = classroomRouter;
