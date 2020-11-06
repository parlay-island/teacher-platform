// const axios = require('axios');

// postLogIn = async function(url, data) {
//     return new Promise(async function (resolve, reject) {
//         axios.post(url, data).then(res => {
//             resolve(res);
//         }).catch(err => {
//             console.log(err.request);
//             reject({
//                 status: err.response.status,
//                 message: err.request.data
//             })
//         });
//     })
// }

// module.exports = {
//     postLogIn: postLogIn
// }