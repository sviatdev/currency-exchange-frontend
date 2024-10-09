import axios from "axios";

export const latestConversion = async (baseCode) => {
    try {
        const response = await axios.get(`http://localhost:8080/currencies/latest/${baseCode}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch supported codes.');
    }
};