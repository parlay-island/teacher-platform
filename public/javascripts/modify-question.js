/**
 * On the page for modifying a existing question, 
 * this function fills in the existing question fields in the input fields.
 * 
 * @author: Jessica Su
 */
export function fillInExistingFields(question) {
    const questionInput = document.getElementById("new-question");
    questionInput.value = question.body;

    const answerChoiceInputs = Array.from(document.getElementsByClassName("answer-choice-input"));
    const existingChoices = question.choices;
    answerChoiceInputs.forEach((choice, index) => {
        choice.value = existingChoices[index].body;
    });

    const existingAnswer = question.answer[0];
    document.getElementsByClassName("answer-choice-radio")[existingAnswer].checked = true;
}