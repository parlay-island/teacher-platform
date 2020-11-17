/**
 * Route for about page.
 * 
 * @author: Jessica Su
 */
const express = require("express");
const aboutRoute = express.Router();

aboutRoute.get("/about", function (req, res) {
    res.render("pages/about");
});

module.exports = aboutRoute;