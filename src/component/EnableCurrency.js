import React, { useState } from 'react';
import { enableCurrency } from '../api/enableCurrency';

const EnableCurrency = () => {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState('');

    const handleEnable = async () => {
        try {
            const data = await enableCurrency(currency);
            setMessage(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Currency code to enable"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />
            <button onClick={handleEnable}>Enable Currency</button>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default EnableCurrency;
