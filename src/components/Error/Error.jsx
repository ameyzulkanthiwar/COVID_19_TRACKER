import React from "react";
import ErrorImage from "../../images/404-error.jpg";
import styles from "./Error.module.css";

const Error = () => {
    return (
        <div>
            <img src={ErrorImage} className={styles.errorImage} alt="Error" />
        </div>
    );
};

export default Error;
