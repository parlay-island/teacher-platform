/**
 * Route for viewing the game.
 * 
 * @author: Jessica Su
 */

const express = require("express");
const gameRouter = express.Router();
const config = require("../config");

gameRouter.get("/game", function (req, res) {
    const gameLink = process.env.GAME_LINK || config.GAME_LINK
    res.redirect(gameLink);
});

module.exports = gameRouter;