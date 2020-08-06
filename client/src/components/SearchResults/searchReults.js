import React, { useEffect } from "react";

import classes from "./searchResults.module.css";
import PlaceHolder from "../UI/PlaceHolder/placeHolder";
import OutOfStock from "../../assets/images/outOfStock.svg";
import Spinner from "../UI/Spinner/Spinner";

const searchResults = (props) => {
  let books = props.bookResults;
  let bookCard = [];
  let totalResults = null;
  console.log(books);

  if (books === 0) {
    bookCard = <PlaceHolder message={"No results, please try again"} />;
  } else if (books.length > 0) {
    bookCard = books.map((book) => (
      <div key={book.id} className={classes.cards_item}>
        <div className={classes.card}>
          <div className={classes.card_image}>
            <img
              onClick={() => props.toggleModal(book.id)}
              src={book.volumeInfo.imageLinks.thumbnail}
              alt="cardImage"
              className={classes.BookImage}
            />
          </div>

          {book.saleInfo.listPrice ? (
            <h1 className={classes.card_title}>
              ${book.saleInfo.listPrice.amount}{" "}
            </h1>
          ) : (
            <div>
              <h2>
                out of stock
                {/* {book.saleInfo.saleability.replace(/_/g, " ").toLowerCase()} */}
                <img className={classes.OutOfStock} src={OutOfStock} />
              </h2>
            </div>
          )}
          <h2 className={classes.card_title}>{book.volumeInfo.title}</h2>
        </div>
      </div>
    ));
    totalResults = <h1>total results: {books.length}</h1>;
  } else {
    bookCard = <PlaceHolder message={"Search for a book!"} />;
  }

  if (props.loading) {
    bookCard = <Spinner />
  }

  return (
    <div className={classes.main}>
      <button onClick={props.toggleBy}>Orderby</button>
      {props.loading ? null : totalResults}
      <div className={classes.cards}>{bookCard}</div>
    </div>
  );
};

export default searchResults;
