const express = require("express");
const questionsIndex = express.Router();

// const questionsController = require('../controllers/questions');

questionsIndex.get("/questions", async function (req, res) {
    var unit = req.query.unit;
    res.render("pages/questions", {
        unit: unit
    });

  // var unit = req.params.unit;
  // var questions = await questionsController.getQuestionsForUnit(unit);
  // res.render("pages/questions", {
  //     questions: questions,
  //     unit: unit
  // });
});

module.exports = questionsIndex;