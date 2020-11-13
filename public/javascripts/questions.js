import { makeXHRRequest } from './request-helper.js';

export function getQuestionsByUnit(unitID) {
    const requestUrl = baseApiUrl + "/questions/?level=" + unitID;
    makeXHRRequest(requestUrl, null, 'GET').then(function (res) {
        const jsonResponse = JSON.parse(res.response);
        const questions = jsonResponse.questions;
        makeQuestionsHtml(questions);
    }).catch(function (error) {
        console.log('something went wrong when fetching questions', error);
        displayQuestionsFetchError();
    });
}

function displayQuestionsFetchError() {
    const questionsDOM = document.getElementsByClassName("questions-body")[0];
    let errorHtml = `<div class="no-questions-text">
                            There was a problem fetching the questions. 
                        </div>`;
    questionsDOM.innerHTML = errorHtml;
}


function makeQuestionsHtml(questions) {
    const questionsDOM = document.getElementsByClassName("questions-body")[0];
    let questionsHtml = '';
    if (questions == null || questions.length == 0) {
        questionsHtml += ` <div class="no-questions-text">
                                There are currently no questions for this unit.
                            </div>`;
    } else {
        updateProgressDescription();
        questions.forEach((question) => {
            var progressText;
            if (question.times_answered == 0) {
                progressText = '0.00% answered';
            } else {
                const percentCorrect = ((question.times_correct / question.times_answered) * 100).toFixed(2);
                progressText = `${percentCorrect}% correct`;
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
    }
    questionsDOM.innerHTML = questionsHtml;
    addClickListenersToQuestionRows(questions);
    addCLickListenersToRemove(questions);
}

function updateProgressDescription() {
    const progressDescriptionDOM = document.getElementsByClassName('question-progress-description')[0];
    progressDescriptionDOM.innerHTML = 'The percent at the right of each question row is the percentage of students who answered that question correctly.';
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
    makeXHRRequest(deleteRequestURL, null, 'DELETE').then(function (res) {
        console.log(res.responseText);
    }).catch (function (error) {
        alert('Something went wrong when trying to delete a question. Please try again.');
        console.log('something went wrong when trying to delete a question', error);
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

