import React, { useState } from 'react';
import '../styles/ConvertCurrencyWithAmount.css';
import { convertCurrencyWithAmount } from '../api/convertCurrencyWithAmount';

const ConvertCurrencyWithAmount = () => {
    const [baseCurrency, setBaseCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [conversionResult, setConversionResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConvertCurrency = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await convertCurrencyWithAmount(baseCurrency, targetCurrency, amount);
            setConversionResult(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="convert-amount-container">
            <h2>Convert Currency with Amount</h2>

            <input
                type="text"
                placeholder="From code (e.g., USD)"
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
            />

            <input
                type="text"
                placeholder="To code (e.g., EUR)"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value.toUpperCase())}
            />

            <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button onClick={handleConvertCurrency}>
                Convert
            </button>

            {error && <p className="error-message">{error}</p>}

            {loading && <p className="loading-message">Converting...</p>}

            {conversionResult && (
                <div className="conversion-result">
                    <h3>Conversion Result:</h3>
                    <p>{amount} {baseCurrency} to {targetCurrency}:</p>
                    <p>Conversion Rate: {conversionResult.conversionRate}</p>
                    <p>Converted Amount: {conversionResult.conversionResult}</p>
                </div>
            )}
        </div>
    );
};

export default ConvertCurrencyWithAmount;
