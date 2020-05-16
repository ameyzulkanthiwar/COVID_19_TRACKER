import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { centuries } from "../../api";

import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleCountry }) => {
    const [fetchCountry, setFetchCountry] = useState([]);
    const [selectValue, setSelectValue] = useState("global");

    useEffect(() => {
        const fetchData = async () => {
            const data = await centuries();
            setFetchCountry(data.countries);
        };
        fetchData();
    }, []);

    return (
        <FormControl className={styles.formControl}>
            <Select
                defaultValue="Global"
                value={selectValue}
                onChange={(e) => {
                    setSelectValue(e.target.value);
                    handleCountry(e.target.value);
                }}
            >
                <MenuItem value="global">Global</MenuItem>
                {fetchCountry &&
                    fetchCountry.length > 0 &&
                    fetchCountry.map((res, index) => {
                        return (
                            <MenuItem key={`${res.name}_${index}`} value={res.name}>
                                {res.name}
                            </MenuItem>
                        );
                    })}
            </Select>
        </FormControl>
    );
};

export default CountryPicker;
