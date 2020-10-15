const express = require("express");
const index = express.Router();

index.get("/", async function (req, res) {
    res.render("pages/choose-unit");
    // var units = await chooseUnitController.getUnits();
    // res.render("pages/choose-unit", {
    //     units: units,
    // });
});

module.exports = index;