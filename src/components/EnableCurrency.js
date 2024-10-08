import React, { useState } from 'react';
import '../styles/EnableDisableCurrency.css';
import { enableCurrency } from '../api/enableCurrency';

const EnableCurrency = () => {
    const [currencyCode, setCurrencyCode] = useState('');
    const [resultMessage, setResultMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleEnableCurrency = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await enableCurrency(currencyCode);
            setResultMessage(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="enable-disable-currency-container">
            <h2>Enable Currency</h2>

            <input
                type="text"
                placeholder="Currency code (e.g., USD)"
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value.toUpperCase())}
            />

            <button className="enable-currency-button" onClick={handleEnableCurrency}>
                Enable Currency
            </button>

            {error && <p className="error-message">{error}</p>}

            {loading && <p className="loading-message">Enabling currency...</p>}

            {resultMessage && <p className="result-message">{resultMessage}</p>}
        </div>
    );
};

export default EnableCurrency;