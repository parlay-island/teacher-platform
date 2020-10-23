import { makePostRequest } from './request-helper.js';
import { fillInExistingFields } from "./modify-question.js";

export function postQuestion(unit, questionID, requestType) {
    const hasNullInputs = checkNullQuestionInputs();
    if (! hasNullInputs) {
        const json = getQuestionInputsAsJson(unit);
        console.log(json);
        var requestURL = baseApiUrl + "/questions/";
        if (questionID) {
            requestURL = baseApiUrl + `/questions/${questionID}`;
        }
        makePostRequest(requestURL, json, requestType).then(function (res) {
            console.log(res.responseText);
            showSuccessAlert(requestType);

            // redirect to question page
            var redirectURL = `/${unit}/questions`;
            if (requestType=='PUT') {
                redirectURL = `/${unit}/questions/view-question?id=${questionID}`;
            }
            setTimeout(() => { window.location = redirectURL;}, 1000);
        }).catch(function (error) {
            showErrorAlert('Something went wrong when trying to add your question. Please try again');
            console.log('something went wrong when posting units', error);
        });
    }
    return false;
}

function showSuccessAlert(requestType) {
    const successAlertDOM = document.getElementsByClassName('alert')[0];
    if (successAlertDOM.classList.contains('alert-danger')) {
        successAlertDOM.classList.remove('alert-danger');
    }
    if (successAlertDOM.classList.contains('alert-inactive')) {
        successAlertDOM.classList.remove('alert-inactive');
    }
    successAlertDOM.classList.add('alert-success');
    var successMessage;
    if (requestType=='POST') {
        successMessage = 'You successfully added a new question.';
    } else {
        successMessage = 'You successfully updated this question.'
    }
    successAlertDOM.innerHTML = ` <strong>Success!</strong> ${successMessage}`;
}

function showErrorAlert(errorMessage) {
    const errorAlertDOM = document.getElementsByClassName('alert')[0];
    if (errorAlertDOM.classList.contains('alert-success')) {
        errorAlertDOM.classList.remove('alert-success');
    }
    if (errorAlertDOM.classList.contains('alert-inactive')) {
        errorAlertDOM.classList.remove('alert-inactive');
    }
    errorAlertDOM.classList.add('alert-danger');
    errorAlertDOM.innerHTML = ` <strong>Error!</strong> ${errorMessage}`;
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
            showErrorAlert('Please fill out the question and ALL answer choices.');
            return true;
        }
    }

    const choiceRadioButtons = Array.from(document.getElementsByClassName("answer-choice-radio"));
    var checkedButtons = choiceRadioButtons.filter(button => button.checked);
    if (checkedButtons.length < 1) {
        showErrorAlert('Please select the CORRECT answer choice.');
        return true;
    }

    return false;
}

function getQuestionInputsAsJson(unit) {
    const questionInput = document.getElementById("new-question");
    const answerChoiceInputs = document.getElementsByClassName(
        "answer-choice-input"
    );

    var i;
    var choices = [];
    for (i = 0; i < answerChoiceInputs.length; i++) {
        choices.push({
            body: answerChoiceInputs[i].value,
            times_chosen: 0,
        });
    }

    var json = {};
    json["body"] = questionInput.value;
    json["tags"] = [unit];
    json["times_answered"] = 0;
    json["times_correct"] = 0;
    json["answer"] = [findCorrectAnswer()];
    json["choices"] = choices;

    // TODO (js803): change this to read from level ID when updating /units endpoint to be /levels instead
    json["level"] = 1;
    return json;
}

function findCorrectAnswer() {
    const choiceRadioButtons = document.getElementsByClassName(
        "answer-choice-radio"
    );
    var i;
    var selected;
    for (i = 0; i < choiceRadioButtons.length; i++) {
        if (choiceRadioButtons[i].checked) {
            selected = parseInt(choiceRadioButtons[i].value);
        }
    }
    
    // answer choice indexes start at 0, not 1
    return parseInt(selected)-1;
}

window.addEventListener("DOMContentLoaded", (event) => {
    // filling in fields when modifying a question
    if (questionID) {
        const questionJSON = JSON.parse(sessionStorage.getItem('question'));
        if (questionJSON.id = parseInt(questionID)) {
            fillInExistingFields(questionJSON);
        }
    }

    document.getElementById('submit-question').addEventListener('click', function (event) {
        postQuestion(questionUnit, questionID,
            questionID ? 'PUT' : 'POST');
        event.preventDefault();
    });
});
