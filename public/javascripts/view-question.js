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

        choicesHtml += `<div class='choice-row ${className}'>
                            <div class='choice-row-text'> ${question.choices[i].body} </div>
                        </div>`;
    }
    choicesDOM.innerHTML = choicesHtml;
}

window.addEventListener("DOMContentLoaded", (event) => {
    fillQuestionAndChoices(JSON.parse(sessionStorage.getItem('question')));
});