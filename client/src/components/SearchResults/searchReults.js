import React from "react";
import classes from "./searchResults.module.css";
import PlaceHolder from "../UI/PlaceHolder/placeHolder";
import Spinner from "../UI/Spinner/Spinner";
import Button from "../UI/Button/Button";
import MainBody from "../MainBody/MainBody";

const SearchResults = (props) => {
  const books = props.bookResults;
  let bookCard = <PlaceHolder message={"Search for a book!"} />;
  console.log(books);

  if (books === 0) {
    bookCard = <PlaceHolder message={"No results, please try again"} />;
  } else if (books.length > 0) {
    bookCard = books.map((book) => (
      <div key={book.id} className={classes.CardItem}>
        <div className={classes.CardImage}>
          <img
            onClick={() => props.toggleModal(book.id)}
            src={book.volumeInfo.imageLinks.thumbnail}
            alt="cardImage"
            className={classes.BookImage}
          />
        </div>
        <div className={classes.BookBody}>
          <h4 className={classes.CardTitle}>{book.volumeInfo.title}</h4>
          {book.saleInfo.listPrice ? (
            <div className={classes.Details}>
              <h4 className={classes.Price}>
                ${book.saleInfo.listPrice.amount}
              </h4>
              {book.inCart ? (
                <Button disabled btnType="InCart">
                  &#10004; <strong> {book.count}</strong> in cart
                </Button>
              ) : (
                <Button
                  disabled={props.adding}
                  btnType="CartBtn"
                  clicked={(e) => props.addToCart(e, book)}
                >
                  ADD TO CART
                </Button>
              )}
            </div>
          ) : (
            <div className={classes.Details}>
              <h3>out of stock</h3>
            </div>
          )}
        </div>
      </div>
    ));
  }

  return (
    <MainBody>
      {props.loading ? (
        <Spinner />
      ) : (
        <div className={classes.BookCardBody}>{bookCard}</div>
      )}
    </MainBody>
  );
};

export default SearchResults;
