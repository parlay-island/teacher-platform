const express = require("express");
const index = express.Router();
const LOCAL_BACKEND_API_URL = require('../config');

index.get("/", async function (req, res) {
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/choose-unit", {
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = index;