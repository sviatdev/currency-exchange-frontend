import axios from "axios";

export const statistic = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/statistic/average`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch supported codes.');
    }
};

export const averageFiveMinStatistic = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/statistic/average/five`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch supported codes.');
    }
};

export const twoCurrenciesStatistic = async (baseCode, targetCode) => {
    try {
        const response = await axios.get(`http://localhost:8080/statistic/${baseCode}/${targetCode}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch supported codes.');
    }
};

export const sumStatistic = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/statistic/sum`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch supported codes.');
    }
};