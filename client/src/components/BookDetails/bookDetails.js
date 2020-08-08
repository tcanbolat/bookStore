import React from "react";

import Aux from "../../hoc/Auxillary/Auxillary";
import classes from "./bookDetails.module.css";
import Button from "../UI/Button/Button";

const bookDetails = (props) => {
  return (
    <Aux>
      <div className={classes.TopRow}>
        <img alt="book cover" src={props.image} />
        <div className={classes.Details}>
          <h3>{props.title}</h3>
          <h3>
            Pages: {props.pageCount === undefined ? "NA" : +props.pageCount}
          </h3>
          <h3>Published: {props.publishedDate}</h3>
          {props.available === "FOR_SALE" ? (
            <Button btnType="Success" clicked={props.addToCart}>add to cart</Button>
          ) : (
            <Button disabled btnType="Danger">
              Out of Stock
            </Button>
          )}
          <Button btnType="Danger" clicked={props.toggle}>
            Cancel
          </Button>
        </div>
      </div>
      <div className={classes.Description}>
        <p>{props.description}</p>
        <a href={props.previewLink} target="_blank" rel="noopener noreferrer">
          more info...
        </a>
      </div>
    </Aux>
  );
};

export default bookDetails;
