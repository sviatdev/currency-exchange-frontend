import React, {useState} from 'react';
import { averageFiveMinStatistic, statistic, sumStatistic, twoCurrenciesStatistic } from "../../api/statistic/./statistic";

const Statistic = () => {
    const [averageStat, setAverageStat] = useState('');
    const [averageFiveMinStat, setAverageFiveMinStat] = useState('');
    const [baseTargetStat, setBaseTargetStat] = useState('');
    const [sumStat, setSumStat] = useState('');
    const [error, setError] = useState(null);

    const handleAverageStatistic = async () => {
        try {
            setError(null);
            const average = await statistic();
            setAverageStat(average);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleAverageFiveMinStatistic = async () => {
        try {
            setError(null);
            const fiveMin = await averageFiveMinStatistic();
            setAverageFiveMinStat(fiveMin);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleTwoCurrenciesStatistic = async () => {
        try {
            setError(null);
            const data = await twoCurrenciesStatistic();
            setBaseTargetStat(data);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleSumStatistic = async () => {
        try {
            setError(null);
            const sum = await sumStatistic();
            setSumStat(sum);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <div>
                <div className="average-statistic-container">
                    <h2>Average Statistic</h2>
                    <button onClick={handleAverageStatistic}>Show statistic</button>
                    <p>{averageStat}</p>
                </div>
            </div>
            <div>
                <div className="average-five-statistic-container">
                    <h2>Average Statistic For Last 5 min</h2>
                    <button onClick={handleAverageFiveMinStatistic}>Show statistic</button>
                    <p>{averageFiveMinStat}</p>
                </div>
            </div>
            <div>
                <div className="base-target-statistic-container">
                    <h2>2 Currencies Statistic</h2>
                    <button onClick={handleTwoCurrenciesStatistic}>Show statistic</button>
                    <p>{baseTargetStat}</p>
                </div>
            </div>
            <div>
                <div className="sum-statistic-container">
                    <h2>Sum Statistic</h2>
                    <button onClick={handleSumStatistic}>Show statistic</button>
                    <p>{sumStat}</p>
                </div>
            </div>
           <div>
               {error && <p className="error-message">{error}</p>}
           </div>
        </div>
    )
};

export default Statistic;