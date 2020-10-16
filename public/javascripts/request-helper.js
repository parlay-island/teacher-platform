const baseApiUrl = "https://parlay-island-backend.herokuapp.com";

export var makeGetRequest = function (url) {
    var requestUrl = baseApiUrl + url;
    var request = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {

            // only run if request is complete
            if (request.readyState != 4) return;

            // process response
            if (request.status >= 200 && request.status < 300) {
                // success 
                resolve(request);
            } else {
                // failure
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };
        // set up HTTP request
        request.open('GET', requestUrl, true);
        // send the request 
        request.send();
    });
}