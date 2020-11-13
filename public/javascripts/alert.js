/**
 * This file provides the functionality for an alert message.
 * It exports functions to show a success message and an error
 * message in an alert banner at the top of the screen.
 * 
 * @author: Jessica Su
 */
export function showSuccessAlert(successMessage) {
    const successAlertDOM = document.getElementsByClassName('alert')[0];
    if (successAlertDOM.classList.contains('alert-danger')) {
        successAlertDOM.classList.remove('alert-danger');
    }
    if (successAlertDOM.classList.contains('alert-inactive')) {
        successAlertDOM.classList.remove('alert-inactive');
    }
    successAlertDOM.classList.add('alert-success');
    successAlertDOM.innerHTML = ` <strong>Success!</strong> ${successMessage}`;
}

export function showErrorAlert(errorMessage) {
    const errorAlertDOM = document.getElementsByClassName('alert')[0];
    if (errorAlertDOM.classList.contains('alert-success')) {
        errorAlertDOM.classList.remove('alert-success');
    }
    if (errorAlertDOM.classList.contains('alert-inactive')) {
        errorAlertDOM.classList.remove('alert-inactive');
    }
    errorAlertDOM.classList.add('alert-danger');
    errorAlertDOM.innerHTML = ` <strong>Error!</strong> ${errorMessage}`;
}