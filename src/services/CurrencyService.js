import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/currencies'

export const getSupportedCodes = async () => {
    const response = await fetch('http://localhost:8080/currencies/all');  // Replace with the correct backend URL
    return response.json();
};

export const convertCurrency = async (baseCode, targetCode, amount) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pair/${baseCode}/${targetCode}/${amount}`);
        return response.data;
    }catch(error) {
        console.error('Error converting currency', error);
        throw error;




    }
}