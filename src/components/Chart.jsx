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
    const [regressionPlot, setRegressionPlot] = useState([]);
    const [cleanPointData, setCleanPointData] = useState([]);
    const [regresssionRes, setRegresssionRes] = useState({});
    const [chartData, setChartData] = useState({})

    const pointState = useSelector((state) => state.CartessianPoints);
    useEffect(() => {
        let storeCleanData = pointState.map((u) => u.coordinates);
        setCleanPointData(storeCleanData);
    }, [pointState]);

    const rawData = [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 2 },
        { x: 5, y: 3 },
        { x: 22, y: -1 },
        { x: 23, y: -5 },
        { x: 32, y: 10 },
        { x: 40, y: -10 }
    ];

    function calc() {
        const { result, formattedPoints } = regressionCalc(cleanPointData);
        setRegressionPlot(formattedPoints);
        setRegresssionRes(result);
        setChartData({
            labels: labelCalc(cleanPointData),
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
                    label: regresssionRes.string,
                    data: regressionPlot || [],
                    borderColor: 'rgb(0,250,154)',
                    backgroundColor: 'rgba(0,250,154, 0.5)',
                    pointRadius: 5
                }
            ]
        })
    }

    function labelCalc(data) {
        const arr = data.map((u) => u.x);
        return [Math.min(...arr) - 5, ...arr.sort((a, b) => a - b), Math.max(...arr) + 5];
    }

    const data = {
        labels: labelCalc(cleanPointData),
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
                label: regresssionRes.string,
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
            <button onClick={calc}>Activate Lasers</button>
            <h1>input </h1>
            {cleanPointData && <p>{JSON.stringify(cleanPointData)}</p>}
            {cleanPointData && cleanPointData.map((u, index) => <p key={index}> {`x = ${u.x} y=${u.y}`}</p>)}
            <div>
                <h1>Output</h1>
                {regressionPlot && JSON.stringify(regressionPlot)}
            </div>
        </div>
    );
}

export default Chart;
/*

[{"x":"8","y":"8"},{"x":"10","y":"10"}]
[{"x":8,"y":8},{"x":10,"y":10}]
 */