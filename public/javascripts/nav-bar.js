import { TEACHER_NAME_KEY, CLASS_CODE, AUTH_KEY, makeXHRRequest} from './request-helper.js';

function getTeacherName() {
    if (!localStorage.getItem(AUTH_KEY) || ! localStorage.getItem(TEACHER_NAME_KEY)) {
        setTimeout(() => {alert('Could not find your information. Please log in')}, 1000);
        window.location.href = "/"; // redirect to log in
    } else {
        setTeacherName(localStorage.getItem(TEACHER_NAME_KEY));
    }
}

function getClassCode() {
    if (!localStorage.getItem(AUTH_KEY) || ! localStorage.getItem(CLASS_CODE)) {
        setTimeout(() => {alert('Could not find your information. Please log in')}, 1000);
        window.location.href = "/"; // redirect to log in
    } else {
        setClassCode(localStorage.getItem(CLASS_CODE));
    }
}

function setTeacherName(name) {
    const teacherDOM = document.getElementsByClassName("teacher-name")[0];
    teacherDOM.innerHTML = `${name}`;
}

function setClassCode(code) {
    const teacherDOM = document.getElementsByClassName("class-code")[0];
    teacherDOM.innerHTML = `${code}`;
}

function logOut() {
    const logOutUrl = baseApiUrl + "/auth/token/logout/";
    makeXHRRequest(logOutUrl, null, 'POST').then(function (res) {
        // clear saved vars for teacher
        localStorage.removeItem(TEACHER_NAME_KEY);
        localStorage.removeItem(CLASS_CODE);
        localStorage.removeItem(AUTH_KEY);
        window.location = '/'; // go back to log-in
    }).catch(function (error) {
        alert('Could not log out. Please try again');
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
    getTeacherName();
    getClassCode();

    document.getElementById('signout').addEventListener('click', function (event) {
        showConfirmLogOutModal();
        event.preventDefault();
    })
})