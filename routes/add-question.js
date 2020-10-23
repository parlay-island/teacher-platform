const LOCAL_BACKEND_API_URL = require('../config');

const express = require("express");
const addQuestionRoute = express.Router();

addQuestionRoute.get("/:unit/add-question", function (req, res) {
    var unit = req.params.unit;
    var questionID = req.query.id;
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/add-question", {
        unit: unit,
        questionID: questionID,
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = addQuestionRoute;
