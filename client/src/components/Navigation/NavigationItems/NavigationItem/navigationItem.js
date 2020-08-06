import React from "react";

import classes from "./navigationItem.module.css";

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <a className={props.active ? classes.active : null} href="/">{props.children}</a>
  </li>
);

export default navigationItem;
