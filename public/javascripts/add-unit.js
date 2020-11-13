import { makeXHRRequest } from './request-helper.js';
import { showErrorAlert, showSuccessAlert } from './alert.js';
import { UNIT_NAME, POST, LEVELS_ENDPOINT, ADD_UNIT_SUCCESS_MESSAGE, CHOOSE_UNIT_URL, ADD_UNIT_FAIL_MESSAGE, REDIRECT_URL_DURATION } from './constants.js';

/**
 * This class is responsible for receiving the inputs
 * from the form to add a unit and sending the POST request
 * to add the unit.
 * 
 * @author: Jessica Su
 */
function getUnitInput() {
    const unitInput = document.getElementById('unit-name');
    var unitJson = {};
    unitJson[UNIT_NAME] = unitInput.value;
    return unitJson;
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('add-unit-form').addEventListener('submit', function (event) {
        var requestUrl = baseApiUrl + LEVELS_ENDPOINT;
        makeXHRRequest(requestUrl, getUnitInput(), POST).then(function (res) {
            showSuccessAlert(ADD_UNIT_SUCCESS_MESSAGE);
            setTimeout(() => {window.location = CHOOSE_UNIT_URL}, REDIRECT_URL_DURATION);
        }).catch(function (error) {
            showErrorAlert(ADD_UNIT_FAIL_MESSAGE);
        })
        event.preventDefault();
    })
})