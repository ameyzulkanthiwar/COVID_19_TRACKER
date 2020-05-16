import React from "react";

// importing all the component like this is a hassle
// import Cards from "./components/Cards/Card";
// import Chart from "./components/Chart/Chart";
// import CountryPicker from "./components/CountryPicker/CountryPicker";

// Cleaner way to import the component
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";

class App extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <h1>App</h1>
                <Cards />
                <Chart />
                <CountryPicker />
            </div>
        );
    }
}

export default App;
