const express = require("express");
const questionsIndex = express.Router();

questionsIndex.get("/game", async function (req, res) {
    res.redirect(`http://${process.env.GAME_VERSION}.s3-website.us-east-2.amazonaws.com`);
});

module.exports = questionsIndex;