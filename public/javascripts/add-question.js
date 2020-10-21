const baseApiUrl = "https://parlay-island-backend.herokuapp.com";

function postQuestion(unit) {
    const hasNullInputs = checkNullQuestionInputs();
    if (! hasNullInputs) {
        const json = getQuestionInputsAsJson(unit);
        console.log(json);
        makePostRequest("/questions/", json).then(function (res) {
            console.log(res.responseText);
            showSuccessAlert();

            // redirect to question page
            setTimeout(() => { window.location = `/${unit}/questions`;}, 1000);
        }).catch(function (error) {
            showErrorAlert('Something went wrong when trying to add your question. Please try again');
            console.log('something went wrong when posting units', error);
        });
    }
    return false;
}

function showSuccessAlert() {
    const successAlertDOM = document.getElementsByClassName('alert')[0];
    if (successAlertDOM.classList.contains('alert-danger')) {
        successAlertDOM.classList.remove('alert-danger');
    }
    if (successAlertDOM.classList.contains('alert-inactive')) {
        successAlertDOM.classList.remove('alert-inactive');
    }
    successAlertDOM.classList.add('alert-success');
    successAlertDOM.innerHTML = ` <strong>Success!</strong> You successfully added a new question.`;
}

function showErrorAlert(errorMessage) {
    const errorAlertDOM = document.getElementsByClassName('alert')[0];
    if (errorAlertDOM.classList.contains('alert-success')) {
        errorAlertDOM.classList.remove('alert-success');
    }
    if (errorAlertDOM.classList.contains('alert-inactive')) {
        errorAlertDOM.classList.remove('alert-inactive');
    }
    errorAlertDOM.classList.add('alert-danger');
    errorAlertDOM.innerHTML = ` <strong>Error!</strong> ${errorMessage}`;
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

function getQuestionInputsAsJson(unit) {
    const questionInput = document.getElementById("new-question");
    const answerChoiceInputs = document.getElementsByClassName(
        "answer-choice-input"
    );

    var i;
    var choices = [];
    for (i = 0; i < answerChoiceInputs.length; i++) {
        choices.push({
            body: answerChoiceInputs[i].value,
            times_chosen: 0,
        });
    }

    var json = {};
    json["body"] = questionInput.value;
    json["tags"] = [unit];
    json["times_answered"] = 0;
    json["times_correct"] = 0;
    json["answer"] = [findCorrectAnswer()];
    json["choices"] = choices;
    return json;
}

var makePostRequest = function (url, data) {
    var requestUrl = baseApiUrl + url;
    console.log(requestUrl);
    console.log(data);
    var request = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
        // only run if request is complete
        if (request.readyState != 4) return;

        // process response
        if (request.status >= 200 && request.status < 300) {
            // success
            resolve(request);
        } else {
            // failure
            reject({
                status: request.status,
                statusText: request.statusText,
            });
        }
        };

        request.open("POST", requestUrl, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
    });
};

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

