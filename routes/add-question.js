const express = require("express");
const addQuestionRoute = express.Router();

addQuestionRoute.get("/:unit/add-question", function (req, res) {
    var unit = req.params.unit;
    var questionID = req.query.id;

    res.render("pages/add-question", {
        unit: unit,
        questionID: questionID
    });
});

module.exports = addQuestionRoute;
