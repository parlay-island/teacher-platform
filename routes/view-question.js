
const express = require("express");
const viewQuestionRoute = express.Router();

viewQuestionRoute.get("/:unit/:unitID/questions/view-question", function (req, res) {
    var questionUnit = req.params.unit;
    var playerID = req.query.student;
    var unitID = req.params.unitID;
    var questionID = req.query.id;

    res.render("pages/view-question", {
        unitID: unitID,
        questionUnit: questionUnit,
        questionID: questionID,
        playerID: playerID ? playerID : null,
        baseAPIUrl: req.app.locals.baseApiURL
    });
});

module.exports = viewQuestionRoute;