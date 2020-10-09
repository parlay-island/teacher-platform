const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const getUnitsApiUrl = "https://parlay-island-backend.herokuapp.com/units/";
const http = rateLimit(axios.create(), {
    maxRequests: 1,
    perMilliseconds: 1000,
});

async function getUnits() {
    try {
        const response = await http.get(getUnitsApiUrl);
        return response.data.units; 
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getUnits: getUnits
};



