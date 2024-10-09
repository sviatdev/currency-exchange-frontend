import React, { useState } from 'react';
import '../../styles/EnableDisableCurrency.css';
import { disableCurrency } from '../../api/conversion/disableCurrency';

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

            <input
                type="text"
                placeholder="Currency code (e.g., USD)"
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value.toUpperCase())}
            />

            <button className="disable-currency-button" onClick={handleDisableCurrency}>
                Disable Currency
            </button>

            {error && <p className="error-message">{error}</p>}

            {loading && <p className="loading-message">Disabling currency...</p>}

            {resultMessage && <p className="result-message">{resultMessage}</p>}
        </div>
    );
};

export default DisableCurrency;
