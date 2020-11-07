import { makeXHRRequest, TEACHER_NAME_KEY, AUTH_KEY } from './request-helper.js';

function getUserNameAndPassword() {
    const usernameInput = document.getElementById('log-in-username');
    const passwordInput = document.getElementById('log-in-password');
    const userJson = {
        "username": usernameInput.value,
        "password": passwordInput.value
    };
    return userJson;
}

function showErrorAlert(message) {
    const errorAlertDOM = document.getElementsByClassName("alert")[0];
    if (errorAlertDOM.classList.contains("alert-inactive")) {
        errorAlertDOM.classList.remove("alert-inactive");
    }
    errorAlertDOM.innerHTML = `<strong>Error!</strong> ${message}`;
}

function fetchTeacherInfo() {
    const requestURL = baseApiUrl + "/teachers/me/";
    return makeXHRRequest(requestURL, null, 'GET').then(function (res) {
        const nameResponse = JSON.parse(res.response).name;
        const name = nameResponse ? nameResponse : "Teacher"; // use default value Teacher if no name is supplied
        localStorage.setItem(TEACHER_NAME_KEY, name);
    }).catch(function (error) {
        showErrorAlert('There was a problem fetching your information. Please log in again.');
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem(AUTH_KEY)) { // already logged in --> redirect to main page
        window.location = '/choose-unit';
    }

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