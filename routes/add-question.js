const express = require("express");
const addQuestionRoute = express.Router();
require("dotenv").config();

addQuestionRoute.get("/:unit/add-question", function (req, res) {
    var unit = req.params.unit;
    var questionID = req.query.id;
    var baseAPIUrl = process.env.BACKEND_API_URL || process.env.LOCAL_BACKEND_API_URL;

    res.render("pages/add-question", {
        unit: unit,
        questionID: questionID,
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = addQuestionRoute;
