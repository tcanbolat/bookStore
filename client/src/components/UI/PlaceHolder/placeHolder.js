import React from "react";

import bookImg from "../../../assets/images/books-icon.jpg";
import classes from "./placeHolder.module.css";

const placeHodler = (props) => {
  return (
    <div className={classes.Container}>
      <h2>{props.message}</h2>
      <img alt="book" src={bookImg} />
    </div>
  );
};

export default placeHodler;
