import React from "react";

// importing all the component like this is a hassle
// import Cards from "./components/Cards/Card";
// import Chart from "./components/Chart/Chart";
// import CountryPicker from "./components/CountryPicker/CountryPicker";

// Cleaner way to import the component
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

class App extends React.Component {
    state = {
        data: {}
    };

    async componentDidMount() {
        const fetchedData = await fetchData();
        console.log("fetchedData:");
        console.log(fetchedData);
        this.setState((prevState) => {
            return {
                ...prevState,
                data: fetchedData
            };
        });
    }

    render() {
        const { data } = this.state;
        return (
            <div className={styles.container}>
                <h1>App</h1>
                <Cards data={data} />
                <Chart />
                <CountryPicker />
            </div>
        );
    }
}

export default App;
