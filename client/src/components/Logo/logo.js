import React from 'react';

import classes from "./logo.module.css"
import logoImage from "../../assets/images/books-icon.jpg";

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img alt="logo" src={logoImage}/>
    </div>
)

export default logo;