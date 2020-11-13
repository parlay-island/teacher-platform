import { makeXHRRequest } from './request-helper.js';
import {
    GET,
    QUESTIONS_BY_LEVEL_ENDPOINT,
    QUESTIONS_FETCH_ERROR_MESSAGE,
    NO_QUESTIONS_MESSAGE,
    NO_ANSWERS_MESSAGE,
    PERCENT_CORRECT_MESSAGE,
    DELETE,
    DELETE_ERROR_MESSAGE,
    QUESTIONS_PERCENT_DESCRIPTION
} from "./constants.js";
/**
 * Displays all the questions for a particular unit.
 * 
 * Performs a GET request to get all the question by unit,
 * displaying error messages if the request fails or if there are no questions.
 * Also handles deleting a question, sending a POST request to delete the question
 * and showing a modal to confirm or cancel the delete.
 * 
 * @author: Jessica Su
 */
export function getQuestionsByUnit(unitID) {
    const requestUrl = baseApiUrl + QUESTIONS_BY_LEVEL_ENDPOINT + unitID;
    makeXHRRequest(requestUrl, null, GET).then(function (res) {
        const jsonResponse = JSON.parse(res.response);
        const questions = jsonResponse.questions;
        makeQuestionsHtml(questions);
    }).catch(function (error) {
        console.log(error);
        displayQuestionsFetchError();
    });
}

function displayQuestionsFetchError() {
    const questionsDOM = document.getElementsByClassName("questions-body")[0];
    let errorHtml = `<div class="no-questions-text">
                            ${QUESTIONS_FETCH_ERROR_MESSAGE}
                        </div>`;
    questionsDOM.innerHTML = errorHtml;
}

function fillQuestionsGrid(questions) {
    let questionsHtml = '';
    updateProgressDescription();
    questions.forEach((question) => {
        var progressText;
        if (question.times_answered == 0) {
            progressText = NO_ANSWERS_MESSAGE;
        } else {
            const percentCorrect = ((question.times_correct / question.times_answered) * 100).toFixed(2);
            progressText = percentCorrect + PERCENT_CORRECT_MESSAGE;
        }

        questionsHtml += ` <div class="question-row">
                                <div class="question-text-section">
                                    <div class="question-text">
                                        ${question.body}
                                    </div>
                                    <div class="question-progress">
                                        ${progressText}
                                    </div>
                                </div>
                                <img class="remove-question-icon" src="/images/trash-icon.png" alt="remove-question-icon">
                            </div>`;
    });
    return questionsHtml;
}

function makeQuestionsHtml(questions) {
    const questionsDOM = document.getElementsByClassName("questions-body")[0];
    let questionsHtml = '';
    if (questions == null || questions.length == 0) {
        questionsHtml += ` <div class="no-questions-text">
                                ${NO_QUESTIONS_MESSAGE}
                            </div>`;
    } else {
        questionsHtml = fillQuestionsGrid(questions);
    }
    questionsDOM.innerHTML = questionsHtml;
    addClickListenersToQuestionRows(questions);
    addCLickListenersToRemove(questions);
}

function updateProgressDescription() {
    const progressDescriptionDOM = document.getElementsByClassName('question-progress-description')[0];
    progressDescriptionDOM.innerHTML = QUESTIONS_PERCENT_DESCRIPTION;
}

function addCLickListenersToRemove(questions) {
    const removeIcons = Array.from(document.getElementsByClassName('remove-question-icon'));
    removeIcons.forEach((removeIcon, index) => {
        removeIcon.addEventListener('click', function (event) {
            showConfirmDeleteModal(questions[index].id);
            event.preventDefault();
        })
    });
}

function showConfirmDeleteModal(questionID) {
    const confirmDeleteModal = document.getElementById("confirmDeleteModal");
    confirmDeleteModal.style.display = "block";

    const confirmDeleteButton = document.getElementById('confirm-delete');
    confirmDeleteButton.onclick = function () {
        removeQuestion(questionID);
    };

    const cancelDeleteButton = document.getElementById('cancel-delete');
    cancelDeleteButton.onclick = function () {
        confirmDeleteModal.style.display = "none";
    }

    const closeIcon = document.getElementById('close-delete-modal');
    closeIcon.onclick = function() {
        confirmDeleteModal.style.display = "none";
    }
}

function removeQuestion(questionID) {
    const deleteRequestURL = baseApiUrl + `/questions/${questionID}`;
    makeXHRRequest(deleteRequestURL, null, DELETE).then(function (res) {
        console.log(res.responseText);
    }).catch (function (error) {
        console.log(error);
        alert(DELETE_ERROR_MESSAGE);
    }).finally(() => {
        window.location.reload();
    });
}

function addClickListenersToQuestionRows(questions) {
    const questionRows = Array.from(document.getElementsByClassName('question-text-section'));
    if (questionRows.length > 0) {
        questionRows.forEach((questionRow, index) => {
            questionRow.addEventListener('click', function (event) {
                sendQuestionToNewPage(questions[index]);
                event.preventDefault();
            });
        });
    }
}

function sendQuestionToNewPage(question) {
    const unit = question.tags[0];
    const unitID = question.level;
    window.location = `/${unit}/${unitID}/questions/view-question?id=${question.id}`;
}

window.addEventListener("DOMContentLoaded", (event) => {
    getQuestionsByUnit(unitID);
});

