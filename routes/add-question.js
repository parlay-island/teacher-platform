/**
 * Route for adding a question.
 * Takes in the unit,unit ID, and question ID through query parameters.
 * Also requires the Parlay Island backend API url to make XHR requests.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const addQuestionRoute = express.Router();
const config = require('../config');

addQuestionRoute.get("/:unit/:unitID/add-question", function (req, res) {
    var unit = req.params.unit;
    var unitID = req.params.unitID;
    var questionID = req.query.id;

    res.render("pages/add-question", {
        unit: unit,
        unitID: unitID,
        questionID: questionID,
        baseAPIUrl: process.env.BACKEND_API_URL || config.BACKEND_API_URL
    });
});

module.exports = addQuestionRoute;
