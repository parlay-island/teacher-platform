const express = require("express");
const questionsIndex = express.Router();
require("dotenv").config();

questionsIndex.get("/:unit/questions", async function (req, res) {
    var baseAPIUrl = process.env.BACKEND_API_URL || process.env.LOCAL_BACKEND_API_URL;
    var unit = req.params.unit;

    res.render("pages/questions", {
        unit: unit,
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = questionsIndex;