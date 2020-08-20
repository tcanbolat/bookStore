import React from "react";

import bookImg from "../../../assets/images/books-icon.jpg";
import classes from "./placeHolder.module.css";

const placeHodler = (props) => {
  return (
    <div className={classes.placeHolderBody}>
      <img alt="book" src={bookImg} />
      <h2>{props.message}</h2>
      {props.children}
    </div>
  );
};

export default placeHodler;
