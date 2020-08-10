import React from "react";

import classes from "./mainBody.module.css";

const MainBody = (props) => {
  return <div className={classes.Container}>{props.children}</div>;
};

export default MainBody;
