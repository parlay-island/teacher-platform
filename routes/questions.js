const express = require("express");
const questionsIndex = express.Router();

questionsIndex.get("/:unit/:unitID/questions", async function (req, res) {
    var unit = req.params.unit;
    var unitID = req.params.unitID;

    res.render("pages/questions", {
        unit: unit,
        unitID: unitID,
        baseAPIUrl: req.app.locals.baseApiURL
    });
});

module.exports = questionsIndex;