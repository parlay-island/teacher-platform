const express = require("express");
const viewQuestionRoute = express.Router();

viewQuestionRoute.get("/:unit/questions/view-question", function (req, res) {
    var questionUnit = req.params.unit;

    res.render("pages/view-question", {
        questionUnit: questionUnit
    });
});

module.exports = viewQuestionRoute;