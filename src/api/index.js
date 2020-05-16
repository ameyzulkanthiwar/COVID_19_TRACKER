import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
    try {
        // Destructuring
        const {
            data: { confirmed, recovered, deaths, lastUpdate }
        } = await axios.get(url);

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
