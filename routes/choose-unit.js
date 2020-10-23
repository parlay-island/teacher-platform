const LOCAL_BACKEND_API_URL = require('../config');
const express = require("express");
const index = express.Router();

index.get("/", async function (req, res) {
    // BACKEND_API_URL comes from EB 
    // LOCALLY - use dev URL
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;

    res.render("pages/choose-unit", {
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = index;