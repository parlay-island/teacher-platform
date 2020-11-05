const axios = require('axios');

postLogIn = function(url, data) {
    return new Promise(async function (resolve, reject) {
        const res = await axios.post(url, data);
        if (res.status >= 200 && res.status < 300) {
            resolve(res);
        } else {
            reject({
                status: res.status
            });
        }
    })
}

module.exports = {
    postLogIn: postLogIn
}