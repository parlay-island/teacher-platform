const express = require("express");
const index = express.Router();

const chooseUnitController = require('../controllers/choose-unit');

index.get("/", async function (req, res) {
    var units = await chooseUnitController.getUnits();
    res.render("pages/choose-unit", {
        units: units,
    });
});

module.exports = index;