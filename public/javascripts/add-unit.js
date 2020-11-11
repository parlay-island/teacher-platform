import { makeXHRRequest } from './request-helper.js';
import { showErrorAlert, showSuccessAlert } from './alert.js';

function getUnitInput() {
    const unitInput = document.getElementById('unit-name');
    const unitJson = {
        "name": unitInput.value
    }
    return unitJson;
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('add-unit-form').addEventListener('submit', function (event) {
        var requestUrl = baseApiUrl + "/levels/";
        makeXHRRequest(requestUrl, getUnitInput(), 'POST').then(function (res) {
            showSuccessAlert('You have successfully added a unit!');
            setTimeout(() => {window.location = '/choose-unit'}, 1000);
        }).catch(function (error) {
            console.log(error);
            showErrorAlert('There was a problem adding your unit. Please try again.')
        })
        event.preventDefault();
    })
})