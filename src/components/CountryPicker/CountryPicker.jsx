import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { centuries } from "../../api";

import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleCountry }) => {
    const [fetchCountry, setFetchCountry] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await centuries();
            setFetchCountry(data.countries);
        };
        fetchData();
    }, []);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountry(e.target.value)}>
                <option value="global">Global</option>
                {fetchCountry &&
                    fetchCountry.length > 0 &&
                    fetchCountry.map((res, index) => {
                        return (
                            <option key={`${res.name}_${index}`} value={res.name}>
                                {res.name}
                            </option>
                        );
                    })}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;
