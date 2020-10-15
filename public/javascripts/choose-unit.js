function getUnits() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://parlay-island-backend.herokuapp.com/units/");

    xhr.onload = function () {
        if (xhr.status == 200) {
            const jsonResponse = JSON.parse(this.response);
            makeUnitsHtml(jsonResponse.units);
        } else {
            console.error(xhr.status);
            displayUnitsFetchError();
        }
        
    };
    xhr.send();
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
            unitHtml += `<a href="/questions?unit=${unit}" class="unit-text">
                    <div class="unit-grid-item">
                        <div class="unit-grid-item-title">
                            ${unit}
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
