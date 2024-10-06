import React, { useEffect, useState } from 'react';
import { getSupportedCodes, convertCurrency } from '../services/CurrencyService';

const CurrencyConverter = () => {
    const [codes, setCodes] = useState([]);
    const [baseCode, setBaseCode] = useState('');
    const [targetCode, setTargetCode] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const data = await getSupportedCodes();
                setCodes(data);
            } catch (error) {
                setError('Failed to fetch currency codes');
            }
        };
        fetchCodes();
    }, []);

    const handleConvert = async () => {
        try {
            const conversionResult = await convertCurrency(baseCode, targetCode, amount);
            setResult(conversionResult);
            setError('');
        } catch (error) {
            setError('Failed to convert currency');
        }
    };

    return (
        <div>
            <div>
                <select onChange={(e) => setBaseCode(e.target.value)} value={baseCode}>
                    <option value="">Select Base Currency</option>
                    {codes.map((currency) => {
                        return (
                            <option key={currency.id} value={currency.baseCode}>
                                {currency.baseCode} - {currency.description}
                            </option>
                        );
                    })}
                </select>

                <select onChange={(e) => setTargetCode(e.target.value)} value={targetCode}>
                    <option value="">Select Target Currency</option>
                    {codes.map((currency) => (
                        <option key={currency.id} value={currency.baseCode}>
                            {currency.baseCode} - {currency.description}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleConvert}>Convert</button>
            </div>

            {error && <p style={{color: 'red'}}>{error}</p>}
            {result && <p>Converted Amount: {result.conversionResult}</p>}
        </div>
    );
};

export default CurrencyConverter;