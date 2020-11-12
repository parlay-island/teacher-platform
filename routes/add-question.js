const express = require("express");
const addQuestionRoute = express.Router();
const LOCAL_BACKEND_API_URL = require('../config');

addQuestionRoute.get("/:unit/:unitID/add-question", function (req, res) {
    var unit = req.params.unit;
    var unitID = req.params.unitID;
    var questionID = req.query.id;

    res.render("pages/add-question", {
        unit: unit,
        unitID: unitID,
        questionID: questionID,
        baseAPIUrl: process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL
    });
});

module.exports = addQuestionRoute;
