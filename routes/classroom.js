
const express = require("express");
const classroomRouter = express.Router();

classroomRouter.get("/", function (req, res) {
    res.render("pages/classroom", {
        baseAPIUrl: req.app.locals.baseApiURL
    });
});

module.exports = classroomRouter;
