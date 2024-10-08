import axios from "axios";

export const convertCurrency = async (baseCode, targetCode) => {
    try {
        const response = await axios.get(`http://localhost:8080/currencies/pair/${baseCode}/${targetCode}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to convert currency.');
    }
};