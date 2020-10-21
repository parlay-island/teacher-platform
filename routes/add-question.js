const express = require("express");
const addQuestionRoute = express.Router();

addQuestionRoute.get("/:unit/add-question", function (req, res) {
    var unit = req.params.unit;
    res.render("pages/add-question", {
        unit: unit
    });
});

module.exports = addQuestionRoute;
