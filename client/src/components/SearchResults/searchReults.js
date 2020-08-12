import React from "react";

import classes from "./searchResults.module.css";
import PlaceHolder from "../UI/PlaceHolder/placeHolder";
import ShoppingCart from "../../assets/images/shoppingCart.svg";
import Spinner from "../UI/Spinner/Spinner";

const SearchResults = (props) => {
  const books = props.bookResults;
  let bookCard = <PlaceHolder message={"Search for a book!"} />;
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
            <div className={classes.Price}>
              <h1 className={classes.card_title}>
                ${book.saleInfo.listPrice.amount}
              </h1>
              <img
                onClick={() => props.addToCart(book)}
                className={classes.Cart}
                alt="shopping cart"
                src={ShoppingCart}
              />
            </div>
          ) : (
            <div className={classes.Price}>
              <h2>out of stock</h2>
            </div>
          )}
          <h2 className={classes.card_title}>{book.volumeInfo.title}</h2>
        </div>
      </div>
    ));
  }

  return (
    <div className={classes.main}>
      {props.loading ? <Spinner /> : <div className={classes.cards}>{bookCard}</div>}      
    </div>
  );
};

export default SearchResults;
