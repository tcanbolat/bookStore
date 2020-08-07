import React from "react";

import classes from "./placeHolder.module.css";

const placeHodler = (props) => {
  return (
    <div className={classes.Container}>
      <h3>{props.message}</h3>
    </div>
  );
};

export default placeHodler;
