import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changableUrl = url;
    const isCounty = country && country !== "global";
    if (isCounty) {
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
        throw new Error({ error: { code: "404", message: "The page could not be found" } });
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
        return error;
    }
};

export const centuries = async () => {
    try {
        const response = await axios.get(`${url}/countries`);
        return response.data;
    } catch (error) {
        return error;
    }
};
