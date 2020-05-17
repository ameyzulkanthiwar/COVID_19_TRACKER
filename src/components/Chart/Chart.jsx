import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import getWindowDimensions from "./getWindowDimention";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState({});
    const [screenWidth, setScreenWidth] = useState(30);
    const { width } = getWindowDimensions();

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await fetchDailyData();
            setDailyData(data);
        };
        fetchAPI();
        console.log("window.innerWidth()");
        console.log(window.innerWidth);
    }, []);

    const barChart = confirmed ? (
        <Bar
            data={{
                labels: ["Infacted", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "People",
                        backgroundColor: ["blue", "green", "red"],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }
                ]
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` }
            }}
        />
    ) : null;

    const lineChart = (height) => {
        return dailyData[0] ? (
            <Line
                height={height && height}
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [
                        {
                            data: dailyData.map((data) => data.confirmed),
                            label: "Infected",
                            borderColor: "#3333ff",
                            fill: true
                        },
                        {
                            data: dailyData.map((data) => data.deaths),
                            label: "Deaths",
                            borderColor: "red",
                            backgroundColor: "rgba(255, 0, 0, 0.5)",
                            fill: true
                        }
                    ]
                }}
            />
        ) : null;
    };

    return (
        <div className={styles.container}>
            {country && country !== "global"
                ? barChart
                : width < 430
                ? lineChart(250)
                : lineChart()}
        </div>
    );
};

export default Chart;
