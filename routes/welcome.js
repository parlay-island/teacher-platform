/**
 * Route for the welcome page.
 * 
 * @author: Jessica Su
 */

const express = require("express");
const welcomeRouter = express.Router();

welcomeRouter.get("/", function (req, res) {
    res.render("pages/welcome");
});

module.exports = welcomeRouter;