const express = require("express");
const index = express.Router();

require("dotenv").config();

index.get("/", async function (req, res) {
    // BACKEND_API_URL comes from EB 
    // LOCAL_BACKEND_API_URL comes from local .env file for running locally
    var baseAPIUrl = process.env.BACKEND_API_URL || process.env.LOCAL_BACKEND_API_URL;

    res.render("pages/choose-unit", {
        baseAPIUrl: baseAPIUrl
    });
});

module.exports = index;