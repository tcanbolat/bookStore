import React, { useState } from "react";

import classes from "./layout.module.css";
import Aux from "../../hoc/Auxillary/Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/toolbar";
import SideDrawer from "../Navigation/SideDrawer/sideDrawer";
import BackToTop from "../UI/BackToTop/BackToTop";

const Layout = (props) => {
  const [toggleSideDrawer, setToggleSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setToggleSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setToggleSideDrawer(!toggleSideDrawer);
  };

  return (
    <Aux>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={toggleSideDrawer} closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
      <BackToTop />
    </Aux>
  );
};

export default Layout;
