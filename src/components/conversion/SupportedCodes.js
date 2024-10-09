import React, { useState } from 'react';
import '../../styles/SupportedCodes.css';
import { fetchSupportedCodes } from '../../api/conversion/supportedCodes';
import { disableCurrency } from '../../api/conversion/disableCurrency';
import { enableCurrency } from '../../api/conversion/enableCurrency';

const SupportedCodes = () => {
    const [codes, setCodes] = useState([]);
    const [error, setError] = useState(null);
    const [showCodes, setShowCodes] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchCodes = async () => {
        try {
            setLoading(true);
            const data = await fetchSupportedCodes();
            setCodes(data);
            setShowCodes(true);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setShowCodes(false);
            setLoading(false);
        }
    };

    const handleToggle = () => {
        if (!showCodes && codes.length === 0) {
            fetchCodes();
        } else {
            setShowCodes(!showCodes);
        }
    };

    const handleDisableCurrency = async (baseCode) => {
        try {
            await disableCurrency(baseCode);
            fetchCodes();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEnableCurrency = async (baseCode) => {
        try {
            await enableCurrency(baseCode);
            fetchCodes();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="supported-codes-container">
            <h2>Supported Currency Codes</h2>

            <button className="show-hide-button" onClick={handleToggle}>
                {showCodes ? 'Hide' : 'Show'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {loading && <p>Loading...</p>}

            {showCodes && !error && !loading && (
                <ul className="currency-list">
                    {codes.map((code) => (
                        <li key={code.id}>
                            <span className="currency-description">
                                <strong>{code.baseCode}</strong>: {code.description}
                                (Active: {code.active ? 'Yes' : 'No'})
                            </span>
                            {code.active ? (
                                <button
                                    className="disable-button"
                                    onClick={() => handleDisableCurrency(code.baseCode)}
                                >
                                    Disable
                                </button>
                            ) : (
                                <button
                                    className="enable-button"
                                    onClick={() => handleEnableCurrency(code.baseCode)}
                                >
                                    Enable
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SupportedCodes;
