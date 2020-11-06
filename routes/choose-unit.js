const express = require("express");
const index = express.Router();

index.get("/", async function (req, res) {
    res.render("pages/choose-unit", {
        baseAPIUrl: req.app.locals.baseApiURL
    });
});

module.exports = index;