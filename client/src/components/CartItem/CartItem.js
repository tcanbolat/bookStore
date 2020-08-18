import React from "react";

import Aux from "../../hoc/Auxillary/Auxillary";
import classes from "./cartItems.module.css";
import Button from "../UI/Button/Button";
import ItemCounter from "../ItemCounter/ItemCounter";

const CartItems = ({ cart, remove, count, removing }) => {
  return (
    <div>
      {cart.map((item) => {
        return (
          <Aux key={item.id}>
            <div className={classes.CartItem}>
              <div className={classes.ItemImage}>
                <img
                  style={{ width: "90px" }}
                  src={item.volumeInfo.imageLinks.thumbnail}
                  alt="book cover"
                />
              </div>
              <div className={classes.ItemDetails}>
                <h3>{item.volumeInfo.title}</h3>
                <Button disabled={removing} clicked={(e) => remove(e, item.id)} btnType="Close">
                  Discard
                </Button>
                <br />
                <br />
                <ItemCounter
                  itemCount={item.count}
                  bookId={item.id}
                  handleCount={(option, bookId, e) => count(option, bookId, e)}
                />
              </div>
            </div>
            <div className={classes.ItemTotal}>
              <p>
                <strong>{item.saleInfo.listPrice.amount + " "}</strong>
                <em> X </em>{" "}
                <strong style={{ color: "#b85240" }}>
                  {item.count ? item.count : 1}
                </strong>{" "}
                =
                <strong>
                  {" "}
                  $
                  {(
                    item.saleInfo.listPrice.amount *
                    (item.count ? item.count : 1)
                  ).toFixed(2)}
                </strong>
              </p>
            </div>
          </Aux>
        );
      })}
    </div>
  );
};

export default CartItems;
