const express = require("express");
const questionsIndex = express.Router();

questionsIndex.get("/:unit/questions", async function (req, res) {
    var unit = req.params.unit;
    res.render("pages/questions", {
        unit: unit
    });
});

module.exports = questionsIndex;