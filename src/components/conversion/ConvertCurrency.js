import React, { useState } from 'react';
import '../../styles/ConvertCurrency.css';
import { convertCurrency } from '../../api/conversion/convertCurrency';

const ConvertCurrency = () => {
    const [baseCurrency, setBaseCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [conversionResult, setConversionResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConvertCurrency = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await convertCurrency(baseCurrency, targetCurrency);
            setConversionResult(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="convert-currency-container">
            <h2>Convert Currency</h2>

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

            <button onClick={handleConvertCurrency}>
                Convert
            </button>

            {error && <p className="error-message">{error}</p>}

            {loading && <p className="loading-message">Converting...</p>}

            {conversionResult && (
                <div className="conversion-result">
                    <h3>Conversion Result</h3>
                    <p>{baseCurrency} to {targetCurrency}:</p>
                    <p>Conversion Rate: {conversionResult.conversion_rate}</p>
                </div>
            )}
        </div>
    );
};

export default ConvertCurrency;