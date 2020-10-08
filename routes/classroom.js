const express = require("express");
const classroomRouter = express.Router();

classroomRouter.get("/", function (req, res) {
    res.render("pages/classroom");
});

module.exports = classroomRouter;
