import { makeXHRRequest } from './request-helper.js';
import { NO_UNITS_TEXT, UNITS_FETCH_ERROR_TEXT, LEVELS_ENDPOINT, GET } from './constants.js';
/**
 * This file is responsible for displaying all the units.
 * It performs a GET request to get all the units, as well as 
 * displaying error messages when the GET request fails or if there are no units.
 * 
 * @author: Jessica Su
 */
function getUnits() {
    var requestUrl = baseApiUrl + LEVELS_ENDPOINT;
    makeXHRRequest(requestUrl, null, GET).then(function (res) {
        const jsonResponse = JSON.parse(res.response);
        const units = jsonResponse.levels;
        makeUnitsHtml(units);
    }).catch(function (error) {
        displayUnitsFetchError();
    });
}

function displayUnitsFetchError() {
    const unitGrid = document.getElementsByClassName("unit-grid-container")[0];
    let errorHtml = `<div class="no-units-text">
                            ${UNITS_FETCH_ERROR_TEXT}
                        </div>`;
    unitGrid.innerHTML = errorHtml;
}

function makeUnitsHtml(units) {
    const unitGrid = document.getElementsByClassName("unit-grid-container")[0];
    let unitHtml = '';
    if (units == null || units.length == 0) {
        unitHtml += `<div class="no-units-text">
                            ${NO_UNITS_TEXT}
                        </div>`;
    } else {
        units.forEach((unit) => {
            unitHtml += `<a href="/${unit.name}/${unit.id}/questions" class="unit-text">
                    <div class="unit-grid-item">
                        <div class="unit-grid-item-title">
                            ${unit.name}
                        </div>
                    </div>
                </a>`;
        });
    }
    unitGrid.innerHTML = unitHtml;
}

window.addEventListener("DOMContentLoaded", (event) => {
    getUnits();
});
