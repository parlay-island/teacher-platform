const express = require("express");
const index = express.Router();

index.get("/", async function (req, res) {
    res.render("pages/choose-unit");
});

module.exports = index;