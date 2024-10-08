import React, { useState } from 'react';
import { disableCurrency } from '../api/disableCurrency'; // Function to disable a currency
import { enableCurrency } from '../api/enableCurrency';
import {fetchSupportedCodes} from "../api/supportedCodes"; // Function to enable a currency

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
            await fetchCodes(); // Re-fetch the codes after disabling a currency
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to enable a currency and refresh the list
    const handleEnableCurrency = async (baseCode) => {
        try {
            await enableCurrency(baseCode); // Call your API to enable the currency
            await fetchCodes(); // Re-fetch the codes after enabling a currency
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Supported Currency Codes</h2>

            {/* Button to trigger API call and toggle the data */}
            <button onClick={handleToggle}>
                {showCodes ? 'Hide Supported Codes' : 'Show Supported Codes'}
            </button>

            {/* Conditionally show error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Conditionally show loading spinner */}
            {loading && <p>Loading...</p>}

            {/* Conditionally render the list of supported codes */}
            {showCodes && !error && !loading && (
                <ul>
                    {codes.map((code) => (
                        <li key={code.id}>
                            <strong>{code.baseCode}</strong>: {code.description}
                            (Active: {code.active ? 'Yes' : 'No'})
                            {/* Button to disable the currency */}
                            {code.active ? (
                                <button onClick={() => handleDisableCurrency(code.baseCode)}>
                                    Disable
                                </button>
                            ) : (
                                <button onClick={() => handleEnableCurrency(code.baseCode)}>
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
