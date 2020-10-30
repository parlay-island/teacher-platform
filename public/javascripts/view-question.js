import { makeXHRRequest } from "./request-helper.js";

function fillQuestionAndChoices(question) {
    const questionTitleDOM = document.getElementsByClassName('question-title')[0];
    questionTitleDOM.innerHTML = `${question.body}`;

    const choicesDOM = document.getElementsByClassName('question-choices')[0];
    const answer = question.answer[0];
    var choicesHtml = '';
    for (var i = 0; i < 4; i++) {
        var className = 'choice-row-incorrect';
        if (i==answer) {
            className = 'choice-row-correct';
        } 

        var choiceProgressText;
        if (question.times_answered == 0) {
            choiceProgressText = '0.00% answered';
        } else {
            const percentChoiceCorrect = ((question.choices[i].times_chosen / question.times_answered) * 100).toFixed(2);
            choiceProgressText = `${percentChoiceCorrect}% answered`;
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
    makeXHRRequest(requestUrl, null, 'GET').then(function (res) {
        const questionJSON = JSON.parse(res.response);
        
        // storing in session so modify question page does not have to re-fetch
        sessionStorage.setItem("question", JSON.stringify(questionJSON));
        fillQuestionAndChoices(questionJSON);
    }).catch(function (error) {
        console.log('something went wrong', error);
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    getQuestion();
});