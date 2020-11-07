import { makeXHRRequest } from './request-helper.js';
import { showSuccessAlert, showErrorAlert } from './alert.js';

function getRegisterInputs() {
    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const usernameInput = document.getElementById('register-username');
    const passwordInput = document.getElementById('register-password');
    const newTeacherJson = {
        "name": nameInput.value, 
        "email": emailInput.value,
        "username": usernameInput.value, 
        "password": passwordInput.value,
        "is_teacher": true
    }
    return newTeacherJson;
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("register-form").addEventListener('submit', function (event) {
        const postTeacherUrl = baseApiUrl + "/auth/users/?format=json";
        makeXHRRequest(postTeacherUrl, getRegisterInputs(), 'POST').then(function (res) {
            showSuccessAlert('You have successfully created a teacher account!')
            setTimeout(() => { window.location = '/'; }, 1000); // redirect to log-in
        }).catch(function (error) {
            showErrorAlert('Registration Failed. Please try again.')
        })
        event.preventDefault();
    })
})