import React, { useState } from 'react';
import '../styles/SupportedCodes.css'; // Import the CSS file
import { fetchSupportedCodes } from '../api/supportedCodes';
import { disableCurrency } from '../api/disableCurrency'; // Function to disable a currency
import { enableCurrency } from '../api/enableCurrency'; // Function to enable a currency

const SupportedCodes = () => {
    const [codes, setCodes] = useState([]);
    const [error, setError] = useState(null);
    const [showCodes, setShowCodes] = useState(false); // State to track visibility
    const [loading, setLoading] = useState(false); // State to track loading

    // Fetch the supported codes from the backend API
    const fetchCodes = async () => {
        try {
            setLoading(true); // Set loading to true
            const data = await fetchSupportedCodes();
            setCodes(data); // Set the array of codes
            setShowCodes(true); // Show the codes after fetching
            setLoading(false); // Set loading to false
        } catch (err) {
            setError(err.message);
            setShowCodes(false); // Hide codes if there is an error
            setLoading(false);
        }
    };

    // Function to handle button toggle
    const handleToggle = () => {
        if (!showCodes && codes.length === 0) {
            fetchCodes(); // Fetch data only if it hasn't been fetched yet
        } else {
            setShowCodes(!showCodes); // Toggle visibility
        }
    };

    // Function to disable a currency and refresh the list
    const handleDisableCurrency = async (baseCode) => {
        try {
            await disableCurrency(baseCode); // Call your API to disable the currency
            fetchCodes(); // Re-fetch the codes after disabling a currency
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to enable a currency and refresh the list
    const handleEnableCurrency = async (baseCode) => {
        try {
            await enableCurrency(baseCode); // Call your API to enable the currency
            fetchCodes(); // Re-fetch the codes after enabling a currency
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="supported-codes-container">
            <h2>Supported Currency Codes</h2>

            {/* Button to trigger API call and toggle the data */}
            <button className="show-hide-button" onClick={handleToggle}>
                {showCodes ? 'Hide' : 'Show'}
            </button>

            {/* Conditionally show error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Conditionally show loading spinner */}
            {loading && <p>Loading...</p>}

            {/* Conditionally render the list of supported codes */}
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
