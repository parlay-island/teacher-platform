const LOCAL_BACKEND_API_URL = require('../config');

const express = require("express");
const questionsIndex = express.Router();

questionsIndex.get("/:unit/questions", async function (req, res) {
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;
    var unit = req.params.unit;

    res.render("pages/questions", {
        unit: unit,
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = questionsIndex;