import { makeXHRRequest} from './request-helper.js';
import { fillInExistingFields } from "./modify-question.js";
import { showSuccessAlert, showErrorAlert } from './alert.js';

export function postQuestion(unitID, unit, question, requestType) {
    const hasNullInputs = checkNullQuestionInputs();
    if (! hasNullInputs) {
        const json = getQuestionInputsAsJson(unitID, unit, question);
        console.log(json);
        var requestURL = baseApiUrl + "/questions/";
        if (question) {
            requestURL = baseApiUrl + `/questions/${question.id}`;
        }
        makeXHRRequest(requestURL, json, requestType).then(function (res) {
            console.log(res.responseText);
            showQuestionSuccessAlert(requestType);

            // redirect to question page
            var redirectURL = `/${unit}/${unitID}/questions`;
            if (question) {
                redirectURL = `/${unit}/${unitID}/questions/view-question?id=${question.id}`;
            }
            setTimeout(() => { window.location = redirectURL;}, 1000);
        }).catch(function (error) {
            showErrorAlert('Something went wrong when trying to add your question. Please try again');
            console.log('something went wrong when posting units', error);
        });
    }
    return false;
}

function showQuestionSuccessAlert(requestType) {
    var successMessage;
    if (requestType=='POST') {
        successMessage = 'You successfully added a new question.';
    } else {
        successMessage = 'You successfully updated this question.'
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

function getQuestionInputsAsJson(unitID, unit, existingQuestion) {
    const questionInput = document.getElementById("new-question");
    const answerChoiceInputs = document.getElementsByClassName(
        "answer-choice-input"
    );

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
    json["body"] = questionInput.value;
    json["tags"] = [unit];
    json["answer"] = [findCorrectAnswer()];
    json["choices"] = choices;
    json["level"] = unitID;
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
    var questionJSON;
    if (questionID) {
        questionJSON = JSON.parse(sessionStorage.getItem('question'));
        if (questionJSON.id = parseInt(questionID)) {
            fillInExistingFields(questionJSON);
        }
    }

    document.getElementById('submit-question').addEventListener('click', function (event) {
        postQuestion(unitID, questionUnit, questionJSON,
            questionID ? 'PUT' : 'POST');
        event.preventDefault();
    });
});
