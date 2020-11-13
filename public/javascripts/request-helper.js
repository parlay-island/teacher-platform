import * as constants from "./constants.js";
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

export var makeXHRRequest = function (requestUrl, data, requestType) {
    var request = new XMLHttpRequest();
    request.withCredentials = true;

    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState != 4) return; 

            if (request.status >= constants.SUCCESS_CODE && request.status < constants.MULTIPLE_CHOICES_CODE) {
                resolve(request);
            } else if (request.status == constants.UNAUTHORIZED_CODE) { // invalid token
                localStorage.clear();
                alert(constants.INVALID_LOGIN_CREDENTIALS_MESSAGE);
                setTimeout(() => { window.location = constants.LOG_IN_URL;}, constants.REDIRECT_URL_DURATION);
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

            if (localStorage.getItem(constants.AUTH_KEY)) {
                const requestTokenHeader = "Token " + localStorage.getItem(constants.AUTH_KEY);
                request.setRequestHeader("Authorization", requestTokenHeader);
            }
            const dataToSend = data ? JSON.stringify(data) : data;
            request.send(dataToSend);
    });
};