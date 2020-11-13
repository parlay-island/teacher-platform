import { makeXHRRequest } from './request-helper.js';
import { showErrorAlert, showSuccessAlert } from './alert.js';
import * as constants from './constants.js';

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
    unitJson[constants.UNIT_NAME] = unitInput.value;
    return unitJson;
}

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('add-unit-form').addEventListener('submit', function (event) {
        var requestUrl = baseApiUrl + constants.LEVELS_ENDPOINT;
        makeXHRRequest(requestUrl, getUnitInput(), constants.POST).then(function (res) {
            showSuccessAlert(constants.ADD_UNIT_SUCCESS_MESSAGE);
            setTimeout(() => {window.location = constants.CHOOSE_UNIT_URL;}, constants.REDIRECT_URL_DURATION);
        }).catch(function (error) {
            showErrorAlert(constants.ADD_UNIT_FAIL_MESSAGE);
        })
        event.preventDefault();
    })
})