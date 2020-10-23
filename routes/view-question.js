const LOCAL_BACKEND_API_URL = require('../config');

const express = require("express");
const viewQuestionRoute = express.Router();

viewQuestionRoute.get("/:unit/questions/view-question", function (req, res) {
    var questionUnit = req.params.unit;
    var questionID = req.query.id;
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/view-question", {
        questionUnit: questionUnit,
        questionID: questionID,
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = viewQuestionRoute;