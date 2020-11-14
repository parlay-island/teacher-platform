/**
 * Route for viewing all questions for a particular unit.
 * Takes in unit and unit ID through route URL.
 * Also requires Parlay Island backend API url to make XHR requets.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const questionsIndex = express.Router();
const LOCAL_BACKEND_API_URL = require('../config');

questionsIndex.get("/:unit/:unitID/questions", async function (req, res) {
    var unit = req.params.unit;
    var unitID = req.params.unitID;

    res.render("pages/questions", {
        unit: unit,
        unitID: unitID,
        baseAPIUrl: process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL
    });
});

module.exports = questionsIndex;