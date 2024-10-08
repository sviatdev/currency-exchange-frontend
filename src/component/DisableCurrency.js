import React, { useState } from 'react';
import { disableCurrency } from '../api/disableCurrency';

const DisableCurrency = () => {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState('');

    const handleDisable = async () => {
        try {
            const data = await disableCurrency(currency);
            setMessage(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Currency code to disable"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />
            <button onClick={handleDisable}>Disable Currency</button>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default DisableCurrency;
