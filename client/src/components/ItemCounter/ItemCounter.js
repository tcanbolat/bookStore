import React from "react";

import classes from "./itemCounter.module.css";

const ItemCounter = (props) => {
  return (
    <div className={classes.ItemCounter}>
      <div
        onClick={() => {
          props.handleCount("subtract", props.bookId);
        }}
      >
        &#8681;
      </div>
      <input
        type="number"
        style={{
          width: parseInt(props.itemCount) > 100 ? "2.8em" : "2.1em",
        }}
        id="nm-inp"
        value={props.itemCount ? props.itemCount : 1}
        onChange={(e) => props.handleCount("input", props.bookId, e)}
      />
      <div
        onClick={() => {
          props.handleCount("add", props.bookId);
        }}
      >
        &#8679;
      </div>
    </div>
  );
};

export default ItemCounter;
