
const express = require("express");
const viewStudentRoute = express.Router();

viewStudentRoute.get("/classroom/view-student/:playerId", function (req, res) {
    var playerId = req.params.playerId;

    res.render("pages/view-student", {
        playerId: playerId,
        baseAPIUrl: req.app.locals.baseApiURL
    });
});

module.exports = viewStudentRoute;