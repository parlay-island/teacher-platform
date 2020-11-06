import { makeXHRRequest } from './request-helper.js';

const TEACHER_NAME_KEY = 'teacherName'

function getTeacherName() {
    if (sessionStorage.getItem(TEACHER_NAME_KEY)) {
        setTeacherName(sessionStorage.getItem(TEACHER_NAME_KEY))
    } else {
        const requestURL = baseApiUrl + '/teachers/me/';
        makeXHRRequest(requestURL, null, 'GET').then(function (res) {
            const name = JSON.parse(res.response).name;
            sessionStorage.setItem(TEACHER_NAME_KEY, name);
            setTeacherName(name);
            
        }).catch(function (error) {
            setTimeout(function () { alert("Could not find your information. Please log in again"); }, 1000);
            // redirect to log in
            window.location.href = '/log-in';
        });
    }
}

function setTeacherName(name) {
    const teacherDOM = document.getElementsByClassName("teacher-name")[0];
    teacherDOM.innerHTML = `${name}`;
}

window.addEventListener("DOMContentLoaded", (event) => {
    getTeacherName();
})