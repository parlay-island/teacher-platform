/**
 * Route for viewing a particular question.
 * Takes in unit, unitID through URL, as well as the questionID and playerID through query params.
 * Requires Parlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const viewQuestionRoute = express.Router();
const config = require('../config');

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
        baseAPIUrl: process.env.BACKEND_API_URL || config.BACKEND_API_URL
    });
});

module.exports = viewQuestionRoute;