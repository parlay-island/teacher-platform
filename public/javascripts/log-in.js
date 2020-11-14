import { makeXHRRequest } from './request-helper.js';
import { showErrorAlert } from './alert.js';
import * as constants from './constants.js';
/**
 * Log-in functionality for log-in page.
 * Collects input from log-in form, as well as sending a POST request to log-in endpoint.
 * If teacher is authenticated on log-in, also performs a GET request to get the teacher's
 * information, including their name and class code.
 * 
 * @author: Jessica Su, Andres Montoya
 */

function getUserNameAndPassword() {
    const usernameInput = document.getElementById('log-in-username');
    const passwordInput = document.getElementById('log-in-password');
    var userJson = {};
    userJson[constants.USERNAME_FIELD] = usernameInput.value;
    userJson[constants.PASSWORD_FIELD] = passwordInput.value;
    return userJson;
}

function fetchTeacherInfo() {
    const requestURL = baseApiUrl + constants.TEACHER_INFO_ENDPOINT;
    makeXHRRequest(requestURL, null, constants.GET).then(function (res) {
        const name = JSON.parse(res.response).name;
        const code = JSON.parse(res.response).class_code;
        localStorage.setItem(constants.TEACHER_NAME_KEY, name);
        localStorage.setItem(constants.CLASS_CODE, code);

        window.location = constants.CHOOSE_UNIT_URL; // go to main page if successful
    }).catch(function (error) {
        showErrorAlert(constants.TEACHER_INFO_FETCH_ERROR_MESSAGE);
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem(constants.AUTH_KEY)) { // have auth key
        fetchTeacherInfo();
    }

    // need to get an auth key
    document.getElementById('log-in-form').addEventListener('submit', function (event) {
        var requestUrl = baseApiUrl + constants.TEACHER_LOGIN_ENDPOINT;
        makeXHRRequest(requestUrl, getUserNameAndPassword(), constants.POST).then(function (res) {
            const auth_token = JSON.parse(res.response).auth_token;
            localStorage.setItem(constants.AUTH_KEY, auth_token);

            if (res.status >= constants.SUCCESS_CODE && res.status < constants.MULTIPLE_CHOICES_CODE) {
                fetchTeacherInfo();
            }
        }).catch(function (error) {
            console.log(error);
            showErrorAlert(constants.INVALID_CREDENTIALS_MESSAGE);
        });
        event.preventDefault();
    });
});