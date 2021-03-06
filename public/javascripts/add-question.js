import { makeXHRRequest} from './request-helper.js';
import { fillInExistingFields } from "./modify-question.js";
import { showSuccessAlert, showErrorAlert } from './alert.js';
import * as constants from './constants.js';
/**
 * This class is responsible for all the interactions on the page for 
 * adding a question. It verifies that the all the correct question
 * fields have been filled out and sends the POST request to add 
 * a question.
 * 
 * @author: Jessica Su
 */

export function postQuestion(unitID, unit, question, requestType) {
    const hasNullInputs = checkNullQuestionInputs();
    if (! hasNullInputs) {
        const json = getQuestionInputsAsJson(unitID, unit, question);
        var requestURL = baseApiUrl + constants.QUESTIONS_ENDPOINT;
        if (question) {
            requestURL = baseApiUrl + `/questions/${question.id}`;
        }
        makeXHRRequest(requestURL, json, requestType).then(function (res) {
            showQuestionSuccessAlert(requestType);

            var redirectURL = `/${unit}/${unitID}/questions`;
            if (question) {
                redirectURL = `/${unit}/${unitID}/questions/view-question?id=${question.id}`;
            }
            setTimeout(() => { window.location = redirectURL;}, 1000);
        }).catch(function (error) {
            showErrorAlert(constants.QUESTION_ADD_ERROR_MESSAGE);
        });
    }
    return false;
}

function showQuestionSuccessAlert(requestType) {
    var successMessage;
    if (requestType==constants.POST) {
        successMessage = constants.QUESTION_ADD_SUCCESS_MESSAGE;
    } else {
        successMessage = constants.QUESTION_UPDATE_SUCCESS_MESSAGE;
    }
    showSuccessAlert(successMessage);
}

function checkNullQuestionInputs() {
    var neededInputs = [];
    const questionInput = document.getElementById("new-question");
    neededInputs.push(questionInput);
    const answerChoiceInputs = Array.from(document.getElementsByClassName("answer-choice-input"));
    neededInputs = neededInputs.concat(answerChoiceInputs);

    var i;
    for (i = 0; i < neededInputs.length; i++) {
        if (! neededInputs[i].value) {
            showErrorAlert(constants.MISSING_INPUT_MESSAGE);
            return true;
        }
    }

    const choiceRadioButtons = Array.from(document.getElementsByClassName("answer-choice-radio"));
    var checkedButtons = choiceRadioButtons.filter(button => button.checked);
    if (checkedButtons.length < 1) {
        showErrorAlert(constants.MISSING_CHOICE_SELECTION_MESSAGE);
        return true;
    }

    return false;
}

function getQuestionInputsAsJson(unitID, unit, existingQuestion) {
    const questionInput = document.getElementById("new-question");
    const answerChoiceInputs = document.getElementsByClassName("answer-choice-input");

    var i;
    var choices = [];
    for (i = 0; i < answerChoiceInputs.length; i++) {
        var choice = {
            body: answerChoiceInputs[i].value
        }
        if (existingQuestion) { // when updating question choices, need the choice ID
            choice.id = existingQuestion.choices[i].id
        }
        choices.push(choice);
    }

    var json = {};
    json[constants.QUESTION_BODY] = questionInput.value;
    json[constants.QUESTION_TAGS] = [unit];
    json[constants.QUESTION_ANSWER] = [findCorrectAnswer()];
    json[constants.QUESTION_CHOICES] = choices;
    json[constants.QUESTION_LEVEL] = unitID;
    return json;
}

function findCorrectAnswer() {
    const choiceRadioButtons = document.getElementsByClassName("answer-choice-radio");
    var i;
    var selected;
    for (i = 0; i < choiceRadioButtons.length; i++) {
        if (choiceRadioButtons[i].checked) {
            selected = parseInt(choiceRadioButtons[i].value);
        }
    }
    return parseInt(selected)-1;  // answer choice indexes start at 0, not 1
}

window.addEventListener("DOMContentLoaded", (event) => {
    var questionJSON;
    if (questionID) {
        questionJSON = JSON.parse(sessionStorage.getItem(constants.SESSION_STORAGE_QUESTION_KEY));
        if (questionJSON.id = parseInt(questionID)) {
            fillInExistingFields(questionJSON);
        }
    }

    document.getElementById('submit-question').addEventListener('click', function (event) {
        postQuestion(unitID, questionUnit, questionJSON, questionID ? constants.PUT : constants.POST);
        event.preventDefault();
    });
});
