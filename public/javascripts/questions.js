import { makeGetRequest } from './request-helper.js';

export function getQuestionsByUnit(unit) {
    unit = decodeURI(unit);
    const requestUrl = "/questions/?tag=" + unit;
    makeGetRequest(requestUrl).then(function (res) {
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
        questions.forEach((question) => {
            questionsHtml += ` <div class="question-row">
                                    <div class="question-text">
                                        ${question.body}
                                    </div>
                                    <img class="remove-question-icon" src="/images/trash-icon.png">
                                </div>`;
            });
    }
    questionsDOM.innerHTML = questionsHtml;
}