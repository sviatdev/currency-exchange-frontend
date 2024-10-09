import axios from "axios";

export const disableCurrency = async (baseCode) => {
    try {
        const response = await axios.put(`http://localhost:8080/currencies/disable/${baseCode}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch supported codes.');
    }
};