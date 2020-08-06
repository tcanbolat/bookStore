import React from "react";

import classes from "./navigationItems.module.css";
import NavigationItem from "./NavigationItem/navigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Search</NavigationItem>
      <NavigationItem link="/mylist">My List</NavigationItem>
  </ul>
);

export default navigationItems;
