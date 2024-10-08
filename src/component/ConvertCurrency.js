import React, { useState } from 'react';
import { convertCurrency } from '../api/convertCurrency';

const ConvertCurrency = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [baseCode, setBaseCode] = useState('');
    const [targetCode, setTargetCode] = useState('');

    const handleConvert = async () => {
        const currencyRegex = /^[A-Z]{3}$/; // Regex to validate 3-letter currency code

        if (!currencyRegex.test(baseCode) || !currencyRegex.test(targetCode)) {
            setError('Currency codes must be 3 letters (e.g., USD, EUR).');
            return;
        }

        try {
            const data = await convertCurrency(baseCode, targetCode);
            setResult(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Base currency (e.g. USD)"
                value={baseCode}
                onChange={(e) => setBaseCode(e.target.value.toUpperCase())} // Ensure uppercase input
            />
            <input
                type="text"
                placeholder="Target currency (e.g. EUR)"
                value={targetCode}
                onChange={(e) => setTargetCode(e.target.value.toUpperCase())} // Ensure uppercase input
            />
            <button onClick={handleConvert}>Convert Currency</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {result && <p>{JSON.stringify(result)}</p>}
        </div>
    );
};

export default ConvertCurrency;
