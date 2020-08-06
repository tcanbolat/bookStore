import React, { useState } from "react";

import classes from "./layout.module.css";
import Aux from "../../hoc/Auxillary/Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/toolbar";
import SideDrawer from "../Navigation/SideDrawer/sideDrawer";

const Layout = (props) => {
  const [toggleSideDrawer, setToggleSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    console.log("layout.js : sideDrawerClosedHandler() hit");
    setToggleSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    console.log("layout.js : sideDrawerToggleHandler() hit");
    setToggleSideDrawer(!toggleSideDrawer);
  };

  return (
    <div>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={toggleSideDrawer} closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>{props.children}</main>
    </div>
  );
};

export default Layout;
