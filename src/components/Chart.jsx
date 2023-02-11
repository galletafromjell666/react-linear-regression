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

const labels = [-1, 0, 1, 2, 3, 4, 5, 6, 7];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export function Chart() {
  const rawData = [
    { x: 1, y: 2 },
    { x: 3, y: 1 },
    { x: 5, y: 2 },
    { x: 6, y: -1 },
  ];

  function labelCalc(rawData) {
    const arr = rawData.map((u) => u.x);
    return [Math.min(...arr) - 5, ...arr, Math.max(...arr) + 5];
  }
  const { formattedPoints } = regressionCalc(rawData);
  const data = {
    labels: labelCalc(rawData),
    datasets: [
      {
        label: "OG",
        data: rawData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        showLine: false,
      },
      {
        label: "Regression",
        data: formattedPoints,
        borderColor: "rgb(0,250,154)",
        backgroundColor: "rgba(0,250,154, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default Chart;