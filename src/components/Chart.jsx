import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import regressionCalc from "../features/regressinCalc";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  chartArea: {
    backgroundColor: "rgba(1,1,1, 0.4)",
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js",
    },
  },
};

export function Chart() {
  const rawData = [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 5, y: 3 },
    { x: 22, y: -1 },
    { x: 23, y: -5 },
    { x: 32, y: 10 },
    { x: 40, y: -10 },
  ];

  function labelCalc(rawData) {
    const arr = rawData.map((u) => u.x);
    return [
      Math.min(...arr) - 5,
      ...arr.sort((a, b) => a - b),
      Math.max(...arr) + 5,
    ];
  }
  const { result, formattedPoints } = regressionCalc(rawData);
  console.log(result);
  const data = {
    labels: labelCalc(rawData),
    datasets: [
      {
        label: "OG",
        data: rawData,
        borderColor: "rgb(255,69,0)",
        backgroundColor: "rgba(255,69,0, 0.5)",
        pointRadius: 10,
        showLine: false,
      },
      {
        label: result.string,
        data: formattedPoints,
        borderColor: "rgb(0,250,154)",
        backgroundColor: "rgba(0,250,154, 0.5)",
        pointRadius: 0,
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default Chart;
