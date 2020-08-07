import React from "react";

import Aux from "../../hoc/Auxillary/Auxillary";
import classes from "./bookDetails.module.css";

const bookDetails = (props) => {
  return (
    <Aux>
      <div className={classes.TopRow}>
        <img src={props.image} />
        <div className={classes.Details}>
          <h3>{props.title}</h3>
          <h3>Pages: {props.pageCount === undefined ? "NA" : + props.pageCount }</h3>
          <h3>Published: {props.publishedDate}</h3>
          <button>add to cart</button>
          <button>Cancel</button>
        </div>
      </div>

      <div>
        <h3>description: {props.description}</h3>
        <a href={props.previewLink} target="_blank" rel="noopener noreferrer">
          more info...
        </a>
      </div>
    </Aux>
  );
};

export default bookDetails;
