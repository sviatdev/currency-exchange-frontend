import React, { useState } from 'react';
import { latestConversion } from '../api/latestConversion';

const LatestConversion = () => {
    const [conversion, setConversion] = useState(null);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState('');

    const handleFetchConversion = async () => {
        try {
            const data = await latestConversion(currency);
            setConversion(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter currency code"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />
            <button onClick={handleFetchConversion}>Get Latest Conversion</button>
            {error && <p>{error}</p>}
            {conversion && <p>{JSON.stringify(conversion)}</p>}
        </div>
    );
};

export default LatestConversion;