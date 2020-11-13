import { makeXHRRequest } from "./request-helper.js";
import { NO_ANSWERS_MESSAGE, PERCENT_ANSWERED_MESSAGE, GET, SESSION_STORAGE_QUESTION_KEY } from "./constants.js";
/**
 * Functionality for viewing a question.
 * Performs a GET request to get the specific question,
 * as well as displaying the question and the answer choices.
 * 
 * @author: Jessica Su
 */

const NUM_CHOICES = 4;
function fillQuestionAndChoices(question) {
    const questionTitleDOM = document.getElementsByClassName('question-title')[0];
    questionTitleDOM.innerHTML = `${question.body}`;
    const choicesDOM = document.getElementsByClassName('question-choices')[0];
    const answer = question.answer[0];

    var choicesHtml = '';
    for (var i = 0; i < NUM_CHOICES; i++) {
        var className = 'choice-row-incorrect';
        if (i==answer) {
            className = 'choice-row-correct';
        } 

        var choiceProgressText;
        if (question.times_answered == 0) {
            choiceProgressText = NO_ANSWERS_MESSAGE;
        } else {
            const percentChoiceCorrect = ((question.choices[i].times_chosen / question.times_answered) * 100).toFixed(2);
            choiceProgressText = percentChoiceCorrect + PERCENT_ANSWERED_MESSAGE;
        }
        choicesHtml += `<div class='choice-row ${className}'>
                            <div class='choice-row-text'> ${question.choices[i].body} </div>

                            <div class='choice-row-progress'>${choiceProgressText}</div>
                        </div>`;
    }
    choicesDOM.innerHTML = choicesHtml;
}

function getQuestion() {
    var requestUrl = baseApiUrl + `/questions/${questionID}`;
    makeXHRRequest(requestUrl, null, GET).then(function (res) {
        const questionJSON = JSON.parse(res.response);
        
        // storing in session so modify question page does not have to re-fetch
        sessionStorage.setItem(SESSION_STORAGE_QUESTION_KEY, JSON.stringify(questionJSON));
        fillQuestionAndChoices(questionJSON);
    }).catch(function (error) {
        console.log(error);
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    getQuestion();
});