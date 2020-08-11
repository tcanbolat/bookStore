import React from "react";

import Aux from "../../hoc/Auxillary/Auxillary";
import classes from "./bookDetails.module.css";
import Button from "../UI/Button/Button";
import Rater from "../UI/Rater/Rater";

const bookDetails = (props) => {

  const { bookDetails } = props;
  return (
    <Aux>
      <div className={classes.TopRow}>
        <img
          alt="book cover"
          src={bookDetails.volumeInfo.imageLinks.thumbnail}
        />
        <div className={classes.Details}>
          <h3>{bookDetails.volumeInfo.title}</h3>
          <p style={{ fontStyle: "italic", fontSize: "15px" }}>
            {bookDetails.volumeInfo.authors.length > 1
              ? bookDetails.volumeInfo.authors.join(" & ")
              : bookDetails.volumeInfo.authors}
          </p>
          <h3>
            Pages:
            {bookDetails.volumeInfo.pageCount === undefined
              ? " NA"
              : " " + bookDetails.volumeInfo.pageCount}
          </h3>
          <h3>
            Published:
            {bookDetails.volumeInfo.publishedDate === undefined
              ? " NA"
              : bookDetails.volumeInfo.publishedDate.slice(0, 4)}
          </h3>
          <Rater rating={bookDetails.volumeInfo.averageRating} />
          {bookDetails.saleInfo.saleability === "FOR_SALE" ? (
            <Button btnType="Success" clicked={props.addToCart}>
              add to cart
            </Button>
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
        <p>{bookDetails.volumeInfo.description}</p>
      </div>
    </Aux>
  );
};

export default bookDetails;
