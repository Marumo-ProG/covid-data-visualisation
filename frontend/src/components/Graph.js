import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({ labels, datasets, type = "line" }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Covid 19 Data overview",
            },
        },
    };

    const data = {
        labels,
        datasets,
    };

    return type === "line" ? (
        <Line options={options} data={data} />
    ) : (
        <Bar options={options} data={data} />
    );
};

export default Graph;
