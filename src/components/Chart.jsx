import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import regressionCalc from '../features/regression/regressinCalc';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    chartArea: {
        backgroundColor: 'rgba(1,1,1, 0.4)'
    },
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: false,
            text: 'Chart.js'
        }
    }
};

export function Chart() {
    // TODO: Remove some (if not all) useState
    const [regressionPlot, setRegressionPlot] = useState([]);
    const [cleanPointData, setCleanPointData] = useState([]);
    const [regresssionRes, setRegresssionRes] = useState({});

    const pointState = useSelector((state) => state.CartessianPoints);
    // TODO: Remove this useEffect
    useEffect(() => {
        let storeCleanData = pointState.map((u) => u.coordinates);
        setCleanPointData(storeCleanData);
        const { result, formattedPoints } = regressionCalc(storeCleanData);
        setRegressionPlot(formattedPoints);
        setRegresssionRes(result);
    }, [pointState]);

    function labelCalc(data) {
        const arr = data.map((u) => u.x);
        return [Math.min(...arr) - 5, ...arr.sort((a, b) => a - b), Math.max(...arr) + 5].map(u => parseFloat(u));
    }

    const label = labelCalc(cleanPointData)
    const data = {
        labels: label,
        datasets: [
            {
                label: 'OG',
                data: cleanPointData,
                borderColor: 'rgb(255,69,0)',
                backgroundColor: 'rgba(255,69,0, 0.5)',
                pointRadius: 10,
                showLine: false
            },
            {
                label: regresssionRes,
                data: regressionPlot || [],
                borderColor: 'rgb(0,250,154)',
                backgroundColor: 'rgba(0,250,154, 0.5)',
                pointRadius: 5
            }
        ]
    };

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
}

export default Chart;
