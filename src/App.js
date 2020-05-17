import React from "react";

// importing all the component like this is a hassle
// import Cards from "./components/Cards/Card";
// import Chart from "./components/Chart/Chart";
// import CountryPicker from "./components/CountryPicker/CountryPicker";

// Cleaner way to import the component
import { Cards, Chart, CountryPicker, Error, Footer } from "./components";
import {
    Card,
    Grid,
    Typography,
    CardContent,
    BottomNavigation,
    CircularProgress
} from "@material-ui/core";

import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/corona_image.jpg";
class App extends React.Component {
    state = {
        data: {},
        country: "",
        isLoading: true,
        isError: false
    };

    async componentDidMount() {
        try {
            const fetchedData = await fetchData();
            this.setState((prevState) => {
                return {
                    ...prevState,
                    data: fetchedData,
                    isLoading: false,
                    isError: false
                };
            });
        } catch (error) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    isError: true
                };
            });
        }
    }

    handleCountry = async (country) => {
        let fetchedData;
        if (country === "global") {
            fetchedData = await fetchData();
            this.setState((prevState) => {
                return {
                    ...prevState,
                    data: fetchedData,
                    country: ""
                };
            });
        } else {
            fetchedData = await fetchData(country);
            this.setState((prevState) => {
                return {
                    ...prevState,
                    data: fetchedData,
                    country
                };
            });
        }
    };

    render() {
        const { data, country, isError, isLoading } = this.state;
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
                        <CountryPicker handleCountry={this.handleCountry} country={country} />
                        <Chart data={data} country={country} />
                    </div>
                )}
                <Footer />
            </div>
        );
    }
}

export default App;
