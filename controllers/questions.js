// const httpRequest = require("./request-helper");
// const http = httpRequest.requestHelper;

// var questionsBaseUrl = httpRequest.baseApiUrl + "/questions/?tag=";

// async function getQuestionsForUnit(unit) {
//     var getQuestionsByUnitUrl = questionsBaseUrl + unit;
//     try {
//         const questionsResponse = await http.get(getQuestionsByUnitUrl);
//         return questionsResponse.data.questions;
//     } catch (error) {
//         console.error(error);
//     }
// }

// module.exports = {
//     getQuestionsForUnit: getQuestionsForUnit
// };