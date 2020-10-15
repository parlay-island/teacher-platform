function getQuestionsByUnit(unit) {
        const xhr = new XMLHttpRequest();
        const getQuestionsByUnitUrl = "https://parlay-island-backend.herokuapp.com/questions/?tag=" + unit;
        xhr.open("GET", getQuestionsByUnitUrl);

        xhr.onload = function () {
            if (xhr.status == 200) {
                const jsonResponse = JSON.parse(this.response);
                makeQuestionsHtml(jsonResponse.questions);
            } else {
                console.error(xhr.status);
                displayQuestionsFetchError();
            }
        };
        xhr.send();
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