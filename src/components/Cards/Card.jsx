import React from "react";
import { Card, Grid, Typography, CardContent, CircularProgress } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import className from "classnames";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    if (!confirmed) {
        return (
            <div className={styles.loading}>
                <CircularProgress />
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                {/* Break point */}
                <Grid
                    item
                    component={Card}
                    xs={12}
                    md={3}
                    className={className(styles.card, styles.infected)}
                >
                    <CardContent>
                        <Typography variant="h5" color="textSecondary" gutterBottom>
                            Infected
                        </Typography>
                        <Typography variant="h5">
                            {/* NOTE: Bellow syntax is equivalent to this syntax{confirmed.value && confirmed.value} */}
                            {/* confirmed?.value */}
                            <CountUp
                                start={0}
                                end={confirmed?.value}
                                duration={1.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2"> Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid
                    item
                    component={Card}
                    xs={12}
                    md={3}
                    className={className(styles.card, styles.recovered)}
                >
                    <CardContent>
                        <Typography variant="h5" color="textSecondary" gutterBottom>
                            Recovered
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={recovered?.value}
                                duration={1.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Number of recovered cases from COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid
                    item
                    component={Card}
                    xs={12}
                    md={3}
                    className={className(styles.card, styles.deaths)}
                >
                    <CardContent>
                        <Typography variant="h5" color="textSecondary" gutterBottom>
                            Deaths
                        </Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths?.value} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2"> Number of deaths due to COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
};

export default Cards;
