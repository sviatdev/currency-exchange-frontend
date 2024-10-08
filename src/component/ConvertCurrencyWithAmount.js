import React, { useState } from 'react';
import { convertCurrencyWithAmount } from '../api/convertCurrencyWithAmount';

const ConvertCurrencyWithAmount = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [baseCode, setBaseCode] = useState('');
    const [targetCode, setTargetCode] = useState('');
    const [amount, setAmount] = useState('');

    const handleConvert = async () => {
        const currencyRegex = /^[A-Z]{3}$/; // Validate 3-letter currency codes
        const amountRegex = /^[+-]?([0-9]*[.])?[0-9]+$/; // Validate amount as a number

        if (!currencyRegex.test(baseCode) || !currencyRegex.test(targetCode)) {
            setError('Currency codes must be 3 letters (e.g., USD, EUR).');
            return;
        }

        if (!amountRegex.test(amount)) {
            setError('Amount must be a valid number.');
            return;
        }

        try {
            const data = await convertCurrencyWithAmount(baseCode, targetCode, amount);
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
                onChange={(e) => setBaseCode(e.target.value.toUpperCase())}
            />
            <input
                type="text"
                placeholder="Target currency (e.g. EUR)"
                value={targetCode}
                onChange={(e) => setTargetCode(e.target.value.toUpperCase())}
            />
            <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleConvert}>Convert Currency with Amount</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {result && <p>{JSON.stringify(result)}</p>}
        </div>
    );
};

export default ConvertCurrencyWithAmount;
