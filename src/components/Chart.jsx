import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePoint } from '../features/regression/regressionSlice';
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
    const dispatch = useDispatch();
    const [regressionPlot, setRegressionPlot] = useState([]);
    const [cleanPointData, setCleanPointData] = useState([]);
    const [regresssionRes, setRegresssionRes] = useState({});

    const pointState = useSelector((state) => state.CartessianPoints);
    useEffect(() => {
        let storeCleanData = pointState.map((u) => u.coordinates);
        setCleanPointData(storeCleanData);
        const { result, formattedPoints } = regressionCalc(storeCleanData);
        setRegressionPlot(formattedPoints);
        setRegresssionRes(result);
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
            <h1>input </h1>
            {pointState && <p>{JSON.stringify(pointState)}</p>}
            {pointState &&
                pointState.map(({ id, coordinates: { x, y } }) => (
                    <div key={id} style={{display:"flex", flexDirection:"row"}}>
                        <p> {`x = ${x} y=${y}`}</p>
                        <button
                            onClick={() => {
                                dispatch(removePoint(id));
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            <div>
                <h1>Output</h1>
                {regressionPlot && JSON.stringify(regressionPlot)}
            </div>
        </div>
    );
}

export default Chart;
