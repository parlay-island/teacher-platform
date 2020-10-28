const LOCAL_BACKEND_API_URL = require('../config');

const express = require("express");
const viewQuestionRoute = express.Router();

viewQuestionRoute.get("/:unit/:unitID/questions/view-question", function (req, res) {
    var questionUnit = req.params.unit;
    var unitID = req.params.unitID;
    var questionID = req.query.id;
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/view-question", {
        unitID: unitID,
        questionUnit: questionUnit,
        questionID: questionID,
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = viewQuestionRoute;