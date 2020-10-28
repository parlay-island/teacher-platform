const LOCAL_BACKEND_API_URL = require('../config');

const express = require("express");
const questionsIndex = express.Router();

questionsIndex.get("/:unit/:unitID/questions", async function (req, res) {
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;
    var unit = req.params.unit;
    var unitID = req.params.unitID;

    res.render("pages/questions", {
        unit: unit,
        unitID: unitID,
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = questionsIndex;