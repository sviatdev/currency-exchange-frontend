import axios from 'axios';

export const enableCurrency = async (baseCode) => {
    try {
        const response = await axios.put(`http://localhost:8080/currencies/enable/${baseCode}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch supported codes.');
    }
};