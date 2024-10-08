import axios from "axios";

export const convertCurrencyWithAmount = async (baseCode, targetCode, amount) => {
    try {
        const response = await axios.get(`http://localhost:8080/currencies/pair/${baseCode}/${targetCode}/${amount}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to convert currency with amount.');
    }
};