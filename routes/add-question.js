const express = require("express");
const addQuestionRoute = express.Router();

const LOCAL_BACKEND_API_URL = require('../config');

addQuestionRoute.get("/:unit/:unitID/add-question", function (req, res) {
    var unit = req.params.unit;
    var unitID = req.params.unitID;
    var questionID = req.query.id;
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/add-question", {
        unit: unit,
        unitID: unitID,
        questionID: questionID,
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = addQuestionRoute;
