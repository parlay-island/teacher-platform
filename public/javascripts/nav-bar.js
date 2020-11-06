import { makeXHRRequest } from './request-helper.js';

function getTeacherName() {
    const requestURL = baseApiUrl + '/teachers/me/';
    makeXHRRequest(requestURL, null, 'GET').then(function (res) {
        const name = JSON.parse(res.response).name;
        const teacherDOM = document.getElementsByClassName("teacher-name")[0];
        teacherDOM.innerHTML = `${name}`;
    }).catch(function (error) {
        setTimeout(function () { alert("Could not find your information. Please log in again"); }, 1000);
        // redirect to log in
        window.location.href = '/log-in';
    });
}
window.addEventListener("DOMContentLoaded", (event) => {
    getTeacherName();
})