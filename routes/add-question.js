const express = require("express");
const addQuestionRoute = express.Router();

addQuestionRoute.get("/:unit/:unitID/add-question", function (req, res) {
    var unit = req.params.unit;
    var unitID = req.params.unitID;
    var questionID = req.query.id;

    res.render("pages/add-question", {
        unit: unit,
        unitID: unitID,
        questionID: questionID,
        baseAPIUrl: req.app.locals.baseApiURL
    });
});

module.exports = addQuestionRoute;
