import { makeXHRRequest } from './request-helper.js';

function getUnits() {
    var requestUrl = baseApiUrl + "/levels/";
    makeXHRRequest(requestUrl, null, 'GET').then(function (res) {
        const jsonResponse = JSON.parse(res.response);
        const units = jsonResponse.levels;
        makeUnitsHtml(units);
    }).catch(function (error) {
        console.log('something went wrong when fetching units', error);
        displayUnitsFetchError();
    });
}

function displayUnitsFetchError() {
    const unitGrid = document.getElementsByClassName("unit-grid-container")[0];
    let errorHtml = `<div class="no-units-text">
                            There was a problem fetching the units. 
                        </div>`;
    unitGrid.innerHTML = errorHtml;
}

function makeUnitsHtml(units) {
    const unitGrid = document.getElementsByClassName("unit-grid-container")[0];
    let unitHtml = '';
    if (units == null || units.length == 0) {
        unitHtml += `<div class="no-units-text">
                            There are currently no units for your questions. 
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
