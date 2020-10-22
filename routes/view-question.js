const express = require("express");
const viewQuestionRoute = express.Router();

viewQuestionRoute.get("/:unit/questions/view-question", function (req, res) {
    var questionUnit = req.params.unit;
    var questionID = req.query.id;

    res.render("pages/view-question", {
        questionUnit: questionUnit,
        questionID: questionID
    });
});

module.exports = viewQuestionRoute;