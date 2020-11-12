
const express = require("express");
const viewQuestionRoute = express.Router();

const LOCAL_BACKEND_API_URL = require('../config');

viewQuestionRoute.get("/:unit/:unitID/questions/view-question", function (req, res) {
    var questionUnit = req.params.unit;
    var playerID = req.query.student;
    var unitID = req.params.unitID;
    var questionID = req.query.id;

    res.render("pages/view-question", {
        unitID: unitID,
        questionUnit: questionUnit,
        questionID: questionID,
        playerID: playerID ? playerID : null,
        baseAPIUrl: process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL
    });
});

module.exports = viewQuestionRoute;