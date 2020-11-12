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