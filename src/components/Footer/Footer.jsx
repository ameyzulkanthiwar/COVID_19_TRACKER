import React from "react";
import { Card, Grid, Typography, CardContent, CircularProgress } from "@material-ui/core";
import styles from "./Footer.module.css";
import className from "classnames";

const Footer = () => {
    return (
        <footer>
            <div className={className(styles.containers)}>
                <div>
                    <h3>
                        Developed by
                        <a href="https://ameyzulkanthiwar.netlify.com"> Amey Zulkanthiwar</a>
                    </h3>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
