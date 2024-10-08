import React from 'react';
import SupportedCodes from './component/SupportedCodes';
import LatestConversion from './component/LatestConversion';
import ConvertCurrency from './component/ConvertCurrency';
import EnableCurrency from './component/EnableCurrency';
import DisableCurrency from './component/DisableCurrency';
import ConvertCurrencyWithAmount from "./component/ConvertCurrencyWithAmount";

const App = () => {
    return (
        <div>
            <h1>Currency Operations</h1>

            <SupportedCodes />
            <LatestConversion />
            <ConvertCurrency />
            <ConvertCurrencyWithAmount />
            <EnableCurrency />
            <DisableCurrency />
        </div>
    );
};

export default App;
