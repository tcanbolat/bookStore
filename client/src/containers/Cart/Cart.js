import React, { useState, useEffect } from "react";

import classes from "./cart.module.css";
import API from "../../utils/API";
import PlaceHolder from "../../components/UI/PlaceHolder/placeHolder";
import MainBody from "../../components/MainBody/MainBody";

const Cart = () => {
  const [cartItems, setCartItems] = useState();

  const emptyCart = <PlaceHolder message="Your cart is empty" />;

  useEffect(() => {
    API.getCart().then((res) => {
      setCartItems(res.data);
    });
  }, []);

  const removeFromCartHandler = (id) => {
    API.deleteBook(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainBody>
      <div className={classes.SavedItems}>
        {cartItems ? cartItems : emptyCart}
        <button onClick={() => removeFromCartHandler(24)}>REMOVE</button>
      </div>
    </MainBody>
  );
};

export default Cart;
