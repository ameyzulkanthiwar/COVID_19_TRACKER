import React, { useState, useEffect } from "react";
// importing all the component like this is a hassle
// import Cards from "./components/Cards/Card";
// import Chart from "./components/Chart/Chart";
// import CountryPicker from "./components/CountryPicker/CountryPicker";

// Cleaner way to import the component
import { Cards, Chart, CountryPicker, Error, Footer } from "./components";
import { CircularProgress } from "@material-ui/core";
import { fetchData } from "./api";
import coronaImage from "./images/corona_image.jpg";

import styles from "./App.module.css";

const App = () => {
    const [data, setData] = useState({});
    const [country, setCountry] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        try {
            const fetchedData = async () => {
                const getFetchedData = await fetchData();
                setData(getFetchedData);
                setIsLoading(false);
                setIsError(false);
            };
            fetchedData();
        } catch (error) {
            setIsError(true);
        }
    }, []);

    const handleCountry = async (country) => {
        let fetchedData;
        if (country === "global") {
            fetchedData = await fetchData();
            setData(fetchedData);
            setCountry("");
        } else {
            fetchedData = await fetchData(country);
            setData(fetchedData);
            setCountry(country);
        }
    };

    if (isError) {
        return <Error />;
    }

    return (
        <div className={styles.container}>
            <img src={coronaImage} className={styles.image} alt="COVID-19" />
            {!isError && isLoading ? (
                <div className={styles.loading}>
                    <CircularProgress />
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className={styles.container}>
                    <Cards data={data} />
                    <CountryPicker handleCountry={handleCountry} country={country} />
                    <Chart data={data} country={country} />
                </div>
            )}
            <Footer />
        </div>
    );
};

export default App;
