import { makeXHRRequest, TEACHER_NAME_KEY, AUTH_KEY, CLASS_CODE } from './request-helper.js';
import { showErrorAlert } from './alert.js';

function getUserNameAndPassword() {
    const usernameInput = document.getElementById('log-in-username');
    const passwordInput = document.getElementById('log-in-password');
    const userJson = {
        "username": usernameInput.value,
        "password": passwordInput.value
    };
    return userJson;
}

function fetchTeacherInfo() {
    const requestURL = baseApiUrl + "/teachers/me/";
    return makeXHRRequest(requestURL, null, 'GET').then(function (res) {
        const nameResponse = JSON.parse(res.response).name;
        const name = nameResponse ? nameResponse : "Teacher"; // use default value Teacher if no name is supplied
        const codeResponse = JSON.parse(res.response).class_code;
        const code = codeResponse ? codeResponse : "Code"; // use default value Teacher if no name is supplied

        localStorage.setItem(TEACHER_NAME_KEY, name);
        localStorage.setItem(CLASS_CODE, code);
    }).catch(function (error) {
        // TODO (js803): check if token has expired --> if so, clear local storage and make new POST log in request
        showErrorAlert('There was a problem fetching your information. Please log in again.');
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem(AUTH_KEY)) { // have auth key
        const teacherPromise = [fetchTeacherInfo()]; // have to check that auth key is still valid
        Promise.all(teacherPromise).then(() => {
            window.location = "/choose-unit";
        })
    }

    // need to get an auth key
    document.getElementById('log-in-form').addEventListener('submit', function (event) {
        var requestUrl = baseApiUrl + "/auth/token/login/?format=json";
        makeXHRRequest(requestUrl, getUserNameAndPassword(), 'POST').then(function (res) {
            const auth_token = JSON.parse(res.response).auth_token;
            localStorage.setItem(AUTH_KEY, auth_token);

            if (res.status >= 200 && res.status < 300) {
                const teacherPromise = [fetchTeacherInfo()];
                Promise.all(teacherPromise).then(() => {
                    window.location = "/choose-unit";
                });
            }
        }).catch(function (error) {
            showErrorAlert('Invalid username or password. Please log in again.');
        });
        event.preventDefault();
    })
});