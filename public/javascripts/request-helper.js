import { showErrorAlert } from './alert.js';

export var makeXHRRequest = function (requestUrl, data, requestType) {
    var request = new XMLHttpRequest();
    request.withCredentials = true;

    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
        // only run if request is complete
        if (request.readyState != 4) return;

        // process response
        if (request.status >= 200 && request.status < 300) {
            // success
            resolve(request);
        } else if (request.status == 401) { // invalid token
            localStorage.clear();
            alert('You login credentials have become invalid, so you have been automatically logged out. Please log in again');
            setTimeout(() => { window.location = '/';}, 1000);
        }
        else {
            // failure
            reject({
                status: request.status,
                statusText: request.statusText,
            });
        }
        };
        request.open(requestType, requestUrl, true);
        request.setRequestHeader("Content-Type", "application/json");

        if (localStorage.getItem("auth_token")) {
            const requestTokenHeader = "Token " + localStorage.getItem("auth_token");
            request.setRequestHeader("Authorization", requestTokenHeader);
        }
        const dataToSend = data ? JSON.stringify(data) : data;
        request.send(dataToSend);
    });
};

// to store vars on log in
export const TEACHER_NAME_KEY = "teacher_name";
export const AUTH_KEY = "auth_token";
export const CLASS_CODE = "class_code";