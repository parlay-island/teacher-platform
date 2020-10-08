const axios = require('axios');

const getUnitsApiUrl = 'https://d72b0b92-f11a-4f1c-a16a-017c729d5f72.mock.pstmn.io/units'

async function getUnits() {
    try {
        const response = await axios.get(getUnitsApiUrl);
        return response.data.units; 
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getUnits: getUnits
};



