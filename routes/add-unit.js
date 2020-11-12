const express = require("express");
const addUnitRoute = express.Router();

const LOCAL_BACKEND_API_URL = require('../config');

addUnitRoute.get("/add-unit", function (req, res) {
    var baseAPIUrl = process.env.BACKEND_API_URL || LOCAL_BACKEND_API_URL;
    res.render("pages/add-unit", {
        baseAPIUrl: baseAPIUrl
    })
});

module.exports = addUnitRoute;
