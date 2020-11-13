import { makeXHRRequest } from './request-helper.js';
import { showSuccessAlert, showErrorAlert } from './alert.js';
import {
    TEACHER_NAME_FIELD,
    TEACHER_EMAIL_FIELD,
    TEACHER_USERNAME_FIELD,
    TEACHER_PASSWORD_FIELD,
    TEACHER_BOOLEAN_FIELD,
    LOG_IN_URL,
    REDIRECT_URL_DURATION,
    MISMATCHED_PASSWORDS_MESSAGE,
    CREATE_TEACHER_ENDPOINT,
    POST,
    TEACHER_SUCCESS_MESSAGE,
    REGISTRATION_INPUT_ERROR_MESSAGE,
    REGISTRATION_FAIL_MESSAGE,
    BAD_REQUEST_CODE,
} from "./constants.js";
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
    newTeacherJson[TEACHER_NAME_FIELD] = nameInput.value;
    newTeacherJson[TEACHER_EMAIL_FIELD] = emailInput.value;
    newTeacherJson[TEACHER_USERNAME_FIELD] = usernameInput.value;
    newTeacherJson[TEACHER_PASSWORD_FIELD] = passwordInput.value;
    newTeacherJson[TEACHER_BOOLEAN_FIELD] = true;
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
            showErrorAlert(MISMATCHED_PASSWORDS_MESSAGE);
        } else {
            const postTeacherUrl = baseApiUrl + CREATE_TEACHER_ENDPOINT;
            makeXHRRequest(postTeacherUrl, getRegisterInputs(), POST).then(function (res) {
                showSuccessAlert(TEACHER_SUCCESS_MESSAGE);
                setTimeout(() => { window.location = LOG_IN_URL; }, REDIRECT_URL_DURATION);
            }).catch(function (error) {
                const errorMessage = error.status == BAD_REQUEST_CODE ? REGISTRATION_INPUT_ERROR_MESSAGE : REGISTRATION_FAIL_MESSAGE;
                showErrorAlert(errorMessage);
            })
        }
        event.preventDefault();
    });
});