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

function checkPasswordsMatch() {
    const passwordInput = document.getElementById('register-password');
    const secondPasswordInput = document.getElementById('register-password-confirm');
    return passwordInput.value === secondPasswordInput.value;
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("register-form").addEventListener('submit', function (event) {
        if (!checkPasswordsMatch()) {
            showErrorAlert('Passwords do not match.')
        } else {
            const postTeacherUrl = baseApiUrl + "/auth/users/?format=json";
            makeXHRRequest(postTeacherUrl, getRegisterInputs(), 'POST').then(function (res) {
                showSuccessAlert('You have successfully created a teacher account!')
                setTimeout(() => { window.location = '/'; }, 1000); // redirect to log-in
            }).catch(function (error) {
                const errorMessage = error.status == 400 ? "Your password is not long enough (needs to be at least 8 chars) or your username is already taken." : "Registration Failed. Please try again";
                showErrorAlert(errorMessage);
            })
        }
        
        event.preventDefault();
    })
})