import { makeXHRRequest } from './request-helper.js';

function getUserNameAndPassword() {
    const usernameInput = document.getElementById('log-in-username');
    const passwordInput = document.getElementById('log-in-password');
    const userJson = {
        "username": usernameInput.value,
        "password": passwordInput.value
    };
    return userJson;
}

function showErrorAlert() {
    const errorAlertDOM = document.getElementsByClassName("alert")[0];
    if (errorAlertDOM.classList.contains("alert-inactive")) {
        errorAlertDOM.classList.remove("alert-inactive");
    }
    errorAlertDOM.innerHTML = `<strong>Error!</strong> Invalid username or password. Please try again`;
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('log-in-form').addEventListener('submit', function (event) {
        var requestUrl = baseApiUrl + "/auth/token/login/?format=json";

        makeXHRRequest(requestUrl, getUserNameAndPassword(), 'POST').then(function (res) {
            if (res.status >= 200 && res.status < 300) {
                window.location = "/choose-unit";
            } 
        }).catch(function (error) {
            showErrorAlert();
        })
        event.preventDefault();
    })
});