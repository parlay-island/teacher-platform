export function fillInExistingFields(question) {
    console.log('fillling in fields');
    const questionInput = document.getElementById("new-question");
    questionInput.value = question.body;

    const answerChoiceInputs = Array.from(document.getElementsByClassName(
        "answer-choice-input"
    ));
    const existingChoices = question.choices;
    answerChoiceInputs.forEach((choice, index) => {
        choice.value = existingChoices[index].body;
    });

    const existingAnswer = question.answer[0];
    document.getElementsByClassName("answer-choice-radio")[existingAnswer].checked = true;
}