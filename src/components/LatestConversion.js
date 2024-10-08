import React, { useState } from 'react';
import '../styles/LatestConversion.css';
import { latestConversion } from '../api/latestConversion';

const LatestConversion = () => {
    const [currency, setCurrency] = useState('');
    const [conversionRates, setConversionRates] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchConversion = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await latestConversion(currency);
            setConversionRates(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="latest-conversion-container">
            <h2>Latest Conversion Rates</h2>

            <input
                type="text"
                placeholder="Currency code (e.g., USD)"
                value={currency}
                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
            />

            <button onClick={handleFetchConversion}>
                Show Latest
            </button>

            {error && <p className="error-message">{error}</p>}
            {loading && <p className="loading-message">Loading...</p>}
            {conversionRates && (
                <div className="conversion-result">
                    <h3>Conversion Rates for {currency}</h3>
                    {Object.entries(conversionRates).map(([code, rate]) => (
                        <p key={code}>
                            {code}: {rate}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LatestConversion;