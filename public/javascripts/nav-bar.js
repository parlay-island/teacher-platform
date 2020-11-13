import { makeXHRRequest } from './request-helper.js';
import {
    TEACHER_NAME_KEY,
    CLASS_CODE,
    AUTH_KEY,
    LOG_IN_URL,
    MISSING_INFORMATION_MESSAGE,
    REDIRECT_URL_DURATION,
    LOG_OUT_ERROR_MESSAGE,
    POST,
    LOGOUT_ENDPOINT,
} from "./constants.js";
/**
 * Performs all the actions related to the nav bar.
 * This includes getting the teacher name and class code to display,
 * as well as the POST request to log out when clicking the sign out button,
 * On log out, a pop-up confirmation modal will be displayed so the teacher can confirm or cancel log out.
 * 
 * @author: Jessica Su, Andres Montoya
 */

function getTeacherNameAndCode() {
    if (!localStorage.getItem(AUTH_KEY) || ! localStorage.getItem(TEACHER_NAME_KEY) || ! localStorage.getItem(CLASS_CODE)) {
        setTimeout(() => {alert(MISSING_INFORMATION_MESSAGE)}, REDIRECT_URL_DURATION);
        window.location.href = LOG_IN_URL;
    } else {
        setTeacherName(localStorage.getItem(TEACHER_NAME_KEY));
        setClassCode(localStorage.getItem(CLASS_CODE));
    }
}

function setTeacherName(name) {
    const teacherDOM = document.getElementsByClassName("teacher-name")[0];
    teacherDOM.innerHTML = `${name}`;
}

function setClassCode(code) {
    const classCodeDOM = document.getElementsByClassName("class-code")[0];
    classCodeDOM.innerHTML = `${code}`;
}

function logOut() {
    const logOutUrl = baseApiUrl + LOGOUT_ENDPOINT;
    makeXHRRequest(logOutUrl, null, POST).then(function (res) {
        // clear saved vars for teacher
        localStorage.removeItem(TEACHER_NAME_KEY);
        localStorage.removeItem(CLASS_CODE);
        localStorage.removeItem(AUTH_KEY);
        window.location = LOG_IN_URL;
    }).catch(function (error) {
        alert(LOG_OUT_ERROR_MESSAGE);
    })
}

function showConfirmLogOutModal() {
    const confirmSignOutModal = document.getElementById("signOutModal");
    confirmSignOutModal.style.display = "block";

    const confirmSignOutButton = document.getElementById('confirm-sign-out');
    confirmSignOutButton.onclick = function () {
        logOut();
    };

    const cancelSignOutButton = document.getElementById('cancel-sign-out');
    cancelSignOutButton.onclick = function () {
        confirmSignOutModal.style.display = "none";
    };

    const closeIcon = document.getElementById('close-sign-out');
    closeIcon.onclick = function() {
        confirmSignOutModal.style.display = "none";
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    getTeacherNameAndCode();

    document.getElementById('signout').addEventListener('click', function (event) {
        showConfirmLogOutModal();
        event.preventDefault();
    })
})