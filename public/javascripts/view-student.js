import { makeXHRRequest } from "./request-helper.js";
import * as constants from "./constants.js";

/**
 * Shows the individual progress by student.
 * Shows all the units that the students has answered questions
 * for, as well as the student's accuracy for those questions.
 * 
 * @author: Holly Ansel
 */

export function getPlayerResults(playerId) {
  let unit_question_map = new Map();
  const units_promises = [getUnits(unit_question_map)];
  getSpecificPlayerInfo(playerId);
  Promise.all(units_promises).then(() => {
    var requestUrl = baseApiUrl + `/players/${playerId}/results/`;
    makeXHRRequest(requestUrl, null, constants.GET)
      .then(function (res) {
        const jsonResponse = JSON.parse(res.response);
        const playerResults = jsonResponse.results;
        const promises = playerResults.map(async (result) => {
          await getQuestionAndAddToMap(
            result.question,
            unit_question_map,
            result
          );
        });
        Promise.all(promises).then(() => {
          makeStudentResultsHtml(playerResults, unit_question_map, playerId);
        });
      })
      .catch(function (error) {
        console.log(error);
        displayStudentResultsFetchError();
      });
  });
}

function getSpecificPlayerInfo(playerId) {
  var playerRequestUrl = baseApiUrl + `/players/${playerId}/`;
  makeXHRRequest(playerRequestUrl, null, constants.GET)
    .then(function (res) {
      const jsonResponse = JSON.parse(res.response);
      makeStudentHeadingHtml(jsonResponse);
    })
    .catch(function (error) {
      console.log(error);
      displayStudentFetchError();
    });
}

function displayStudentResultsFetchError() {
  const studentsDOM = document.getElementsByClassName("student-performance")[0];
  let errorHtml = `<div class="no-results-text">
                            ${constants.STUDENTS_FETCH_ERROR_TEXT} 
                        </div>`;
  studentsDOM.innerHTML = errorHtml;
}

function displayStudentFetchError() {
  const studentsDOM = document.getElementsByClassName("student-heading-section")[0];
  let errorHtml = `<div class="no-results-text">
                            ${constants.STUDENTS_FETCH_ERROR_TEXT} 
                        </div>`;
  studentsDOM.innerHTML = errorHtml;
}

function makeStudentHeadingHtml(student) {
  const studentDOM = document.getElementsByClassName("student-heading-section")[0];
  let studentHtml = "";
  if (student == null) {
    studentHtml += ` <div class="no-results-text">
                        ${constants.MISSING_STUDENT_MESSAGE}
                    </div>`;
  } else {
    const color = determineColor(student.accuracy);
    const colorStyle = getComputedStyle(document.body).getPropertyValue(`--${color}`);
    studentHtml += `<div class="student-header">
                      <div class="student-name">
                        ${student.name}
                      </div>
                      <div class="student-accuracy" style="color:${colorStyle};">
                        ${Number((student.accuracy).toFixed(2))}%
                      </div>
                    </div>`;
  }
  studentDOM.innerHTML = studentHtml;
}

function determineColor(percentage){
  if(percentage > 75) {
    return constants.GREEN_COLOR;
  } else if(percentage > 50) {
    return constants.YELLOW_COLOR;
  } else if(percentage > 25) {
    return constants.ORANGE_COLOR;
  } else {
    return constants.RED_COLOR;
  }
}

function makeStudentResultsHtml(studentResults, unit_question_map, playerId) {
  const studentsDOM = document.getElementsByClassName("student-performance")[0];
  let studentsHtml = "";
  let questions_ordered = [];
  if (studentResults == null || studentResults.length == 0) {
    studentsHtml += ` <div class="no-results-text">
                                  ${constants.NO_STUDENT_RESULTS_MESSAGE}
                              </div>`;
  } else {
    unit_question_map.forEach((questionsAndResponses, unit) => {
      const questionResults = makeUnitResultHtml(questionsAndResponses, questions_ordered);
      let unitHtml = ` <div class="unit-results">
                          <div class="unit-title">
                            ${unit.name}
                          </div>
                          <div class="question-results">
                            ${questionResults}
                          </div>
                      </div>`;
      studentsHtml += unitHtml;
    });
  }
  studentsDOM.innerHTML = studentsHtml;
  addClickListenersToQuestionRows(questions_ordered, playerId);
}

function makeUnitResultHtml(questionsAndResponses, questions_ordered) {
  let questionHtml = "";
  if (questionsAndResponses == null || questionsAndResponses.size === 0) {
    questionHtml = `<div class="no-results-text">
                          ${constants.NO_STUDENT_RESULTS_PER_UNIT_MESSAGE}
                        </div>`;
  } else {
    questionsAndResponses.forEach((responses, question) => {
      questions_ordered.push(question);
      let responsesCorrect = 0;
      let totalResponses = 0;
      responses.forEach((response) => {
        totalResponses += response.count;
        responsesCorrect += response.is_correct ? response.count : 0;
      });
      const accuracy = (totalResponses > 0 ? responsesCorrect / totalResponses : 0) * 100;
      const color = determineColor(accuracy);
      const colorStyle = getComputedStyle(document.body).getPropertyValue(`--${color}`);
      questionHtml += `<div class="question-text-section" style="background-color:${colorStyle};">
                                    <div class="question-text">
                                            ${question.body}
                                            <div class="question-percent">
                                                ${accuracy}%
                                            </div>
                                    </div>
                            </div>`;
    });
  }
  return questionHtml;
}

function addClickListenersToQuestionRows(questions_ordered, player) {
  const questionRows = Array.from(
    document.getElementsByClassName("question-text-section")
  );
  if (questionRows.length > 0) {
    questionRows.forEach((questionRow, index) => {
        questionRow.addEventListener("click", function (event) {
        sendToQuestionPage(questions_ordered[index], player);
        event.preventDefault();
      });
    });
  }
}

function sendToQuestionPage(question, player) {
  const unit = question.tags[0];
  const unitID = question.level;
  window.location = `/${unit}/${unitID}/questions/view-question?id=${question.id}&student=${player}`;
}

function getUnits(unit_question_map) {
  var requestUrl = baseApiUrl + constants.LEVELS_ENDPOINT;
  return makeXHRRequest(requestUrl, null, constants.GET)
    .then(function (res) {
      const jsonResponse = JSON.parse(res.response);
      const levels = jsonResponse.levels;
      levels.forEach((level) => unit_question_map.set(level, new Map()));
    })
    .catch(function (error) {
      console.log(error);
      displayStudentResultsFetchError();
    });
}

function getQuestionAndAddToMap(questionID, unit_question_map, response) {
  var requestUrl = baseApiUrl + `/questions/${questionID}`;
  return makeXHRRequest(requestUrl, null, constants.GET)
    .then(function (res) {
      const question = JSON.parse(res.response);
      unit_question_map.forEach((_, key) => {
        if (key.id === question.level) {
          const question_map = unit_question_map.get(key);
          let existing_responses = [];
          question_map.forEach((values, key) => {
            if (JSON.stringify(key) === JSON.stringify(question)) {
              existing_responses = values;
              question_map.set(key, [...values, response]);
            }
          });
          if (existing_responses.length === 0) {
            question_map.set(question, [response]);
          }
          unit_question_map.set(key, question_map);
        }
      });
    })
    .catch(function (error) {
      console.log(error);
      displayStudentResultsFetchError();
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
  getPlayerResults(playerId);
});
