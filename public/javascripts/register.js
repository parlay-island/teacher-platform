import { makeXHRRequest } from './request-helper.js';
import { showSuccessAlert, showErrorAlert } from './alert.js';
import * as constants from "./constants.js";
/**
 * Teacher registration.
 * Collects the correct input from the registration fields,
 * verifies the inputs (eg. password matching), and sends the POST request
 * to create a new teacher account. 
 * 
 * @author: Jessica Su
 */
function getRegisterInputs() {
    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const usernameInput = document.getElementById('register-username');
    const passwordInput = document.getElementById('register-password');
    var newTeacherJson = {};
    newTeacherJson[constants.TEACHER_NAME_FIELD] = nameInput.value;
    newTeacherJson[constants.TEACHER_EMAIL_FIELD] = emailInput.value;
    newTeacherJson[constants.TEACHER_USERNAME_FIELD] = usernameInput.value;
    newTeacherJson[constants.TEACHER_PASSWORD_FIELD] = passwordInput.value;
    newTeacherJson[constants.TEACHER_BOOLEAN_FIELD] = true;
    return newTeacherJson;
}

function checkPasswordsMatch() {
    const passwordInput = document.getElementById('register-password');
    const secondPasswordInput = document.getElementById('register-password-confirm');
    return passwordInput.value === secondPasswordInput.value;
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("register-form").addEventListener('submit', function (event) {
        if (!checkPasswordsMatch()) {
            showErrorAlert(constants.MISMATCHED_PASSWORDS_MESSAGE);
        } else {
            const postTeacherUrl = baseApiUrl + constants.CREATE_TEACHER_ENDPOINT;
            makeXHRRequest(postTeacherUrl, getRegisterInputs(), constants.POST).then(function (res) {
                showSuccessAlert(constants.TEACHER_SUCCESS_MESSAGE);
                setTimeout(() => { window.location = constants.LOG_IN_URL; }, constants.REDIRECT_URL_DURATION);
            }).catch(function (error) {
                const errorMessage = error.status == constants.BAD_REQUEST_CODE ? constants.REGISTRATION_INPUT_ERROR_MESSAGE : constants.REGISTRATION_FAIL_MESSAGE;
                showErrorAlert(errorMessage);
            })
        }
        event.preventDefault();
    });
});