import React from "react";
import { Link } from "react-router-dom";

import classes from "./sideDrawer.module.css";
import Logo from "../../Logo/logo";
import Aux from "../../../hoc/Auxillary/Auxillary";
import NavigationItems from "../NavigationItems/navigationItems";
import Backdrop from "../../UI/Backdrop/backdrop";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <div className={classes.Section}></div>
        <nav onClick={props.closed}>
          <NavigationItems />
        </nav>
        <div className={classes.Section}></div>
        <Link onClick={props.closed} style={{ textDecoration: "none" }} to="/orderhistory">
          <div className={classes.OrdersLink}>Orders</div>
        </Link>
      </div>
    </Aux>
  );
};

export default sideDrawer;
