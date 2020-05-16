import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changableUrl = url;
    if (country) {
        changableUrl = `${url}/countries/${country}`;
    }

    try {
        // Destructuring
        const {
            data: { confirmed, recovered, deaths, lastUpdate }
        } = await axios.get(changableUrl);

        // We are just taking part of the data that we need
        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        };
    } catch (error) {
        console.log("Error:", error);
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        return data.map(({ confirmed, deaths, reportDate: date }) => ({
            confirmed: confirmed.total,
            deaths: deaths.total,
            date
        }));
    } catch (error) {
        console.log("Error:", error);
        return error;
    }
};

export const centuries = async () => {
    try {
        const response = await axios.get(`${url}/countries`);
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        return error;
    }
};
