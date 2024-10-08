import React, { useState } from 'react';
import '../styles/EnableDisableCurrency.css'; // Import the CSS file
import { disableCurrency } from '../api/disableCurrency';

const DisableCurrency = () => {
    const [currencyCode, setCurrencyCode] = useState('');
    const [resultMessage, setResultMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDisableCurrency = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await disableCurrency(currencyCode);
            setResultMessage(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="enable-disable-currency-container">
            <h2>Disable Currency</h2>

            {/* Input for currency code */}
            <input
                type="text"
                placeholder="Currency code (e.g., USD)"
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value.toUpperCase())}
            />

            {/* Button to disable currency */}
            <button className="disable-currency-button" onClick={handleDisableCurrency}>
                Disable Currency
            </button>

            {/* Show error message */}
            {error && <p className="error-message">{error}</p>}

            {/* Show loading message */}
            {loading && <p className="loading-message">Disabling currency...</p>}

            {/* Show result message */}
            {resultMessage && <p className="result-message">{resultMessage}</p>}
        </div>
    );
};

export default DisableCurrency;
