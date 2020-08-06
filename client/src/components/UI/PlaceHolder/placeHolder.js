import React from "react";

import classes from "./placeHolder.module.css";

const placeHodler = (props) => {
  return (
    <div className={classes.Container}>
      <h1>{props.message}</h1>
    </div>
  );
};

export default placeHodler;
