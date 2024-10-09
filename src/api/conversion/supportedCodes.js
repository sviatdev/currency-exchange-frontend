import axios from "axios";

export const fetchSupportedCodes = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/currencies/all`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch supported codes.');
    }
};