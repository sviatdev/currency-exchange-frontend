import React, { useState } from 'react';
import SupportedCodes from './components/SupportedCodes';
import LatestConversion from './components/LatestConversion';
import ConvertCurrency from './components/ConvertCurrency';
import ConvertCurrencyWithAmount from './components/ConvertCurrencyWithAmount';
import EnableCurrency from './components/EnableCurrency';
import DisableCurrency from './components/DisableCurrency';
import './styles/App.css';
import logo from './assets/currency-exchange-logo.png';

const App = () => {
    const [activeTab, setActiveTab] = useState('supportedCodes');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'supportedCodes':
                return <SupportedCodes />;
            case 'latestConversion':
                return <LatestConversion />;
            case 'convertCurrency':
                return <ConvertCurrency />;
            case 'convertCurrencyWithAmount':
                return <ConvertCurrencyWithAmount />;
            case 'enableCurrency':
                return <EnableCurrency />;
            case 'disableCurrency':
                return <DisableCurrency />;
            default:
                return <SupportedCodes />;
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo-container">
                    <img src={logo} alt="Currency Exchange Logo" className="app-logo" />
                </div>

                <nav className="tabs">
                    <button
                        className={activeTab === 'supportedCodes' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('supportedCodes')}
                    >
                        Supported Codes
                    </button>
                    <button
                        className={activeTab === 'latestConversion' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('latestConversion')}
                    >
                        Latest Conversion
                    </button>
                    <button
                        className={activeTab === 'convertCurrency' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('convertCurrency')}
                    >
                        Convert Currency
                    </button>
                    <button
                        className={activeTab === 'convertCurrencyWithAmount' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('convertCurrencyWithAmount')}
                    >
                        Convert With Amount
                    </button>
                    <button
                        className={activeTab === 'enableCurrency' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('enableCurrency')}
                    >
                        Enable Currency
                    </button>
                    <button
                        className={activeTab === 'disableCurrency' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('disableCurrency')}
                    >
                        Disable Currency
                    </button>
                </nav>
            </header>

            <main className="tab-content">
                {renderTabContent()}
            </main>
        </div>
);
};

export default App;
