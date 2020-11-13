/**
 * Shared helper function to perform XHR requests (POST, PUT, DELETE, GET).
 * ALL requests to the backend API from the frontend use this shared method.
 * 
 * @param {*} requestUrl - the url endpoint
 * @param {*} data - the data being sent
 * @param {*} requestType - the type of request
 * 
 * @author: Jessica Su
 */

import {
    INVALID_LOGIN_CREDENTIALS_MESSAGE,
    LOG_IN_URL,
    REDIRECT_URL_DURATION,
    SUCCESS_CODE,
    MULTIPLE_CHOICES_CODE,
    UNAUTHORIZED_CODE,
    AUTH_KEY,
} from "./constants.js";

export var makeXHRRequest = function (requestUrl, data, requestType) {
    var request = new XMLHttpRequest();
    request.withCredentials = true;

    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState != 4) return; 

            if (request.status >= SUCCESS_CODE && request.status < MULTIPLE_CHOICES_CODE) {
                resolve(request);
            } else if (request.status == UNAUTHORIZED_CODE) { // invalid token
                localStorage.clear();
                alert(INVALID_LOGIN_CREDENTIALS_MESSAGE);
                setTimeout(() => { window.location = LOG_IN_URL;}, REDIRECT_URL_DURATION);
            }
            else {
                reject({
                    status: request.status,
                    statusText: request.statusText,
                });
            }
            };
            request.open(requestType, requestUrl, true);
            request.setRequestHeader("Content-Type", "application/json");

            if (localStorage.getItem(AUTH_KEY)) {
                const requestTokenHeader = "Token " + localStorage.getItem(AUTH_KEY);
                request.setRequestHeader("Authorization", requestTokenHeader);
            }
            const dataToSend = data ? JSON.stringify(data) : data;
            request.send(dataToSend);
    });
};