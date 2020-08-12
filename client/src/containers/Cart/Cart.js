import React, { useState, useEffect } from "react";

import classes from "./cart.module.css";
import API from "../../utils/API";
import PlaceHolder from "../../components/UI/PlaceHolder/placeHolder";
import MainBody from "../../components/MainBody/MainBody";
import Spinner from "../../components/UI/Spinner/Spinner";

const Cart = React.memo(() => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const emptyCart = <PlaceHolder message="Your cart is empty" />;

  useEffect(() => {
    API.getCart()
      .then((res) => {
        setLoading(false);
        console.log("REPSONSE: ", res.data);
        setCartItems(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const removeFromCartHandler = (id) => {
    setLoading(true);
    API.deleteBook(id)
      .then((res) => {
       const updateResults = cartItems.filter((item) => item.id !== id);
        setCartItems(updateResults);
        setLoading(false);
        console.log(updateResults);

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log("STATE: ", cartItems);

  return (
    <MainBody>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.SavedItems}>
          {cartItems.length <= 0 ? (
            emptyCart
          ) : (
            <div>
              {cartItems.map((item) => {
                return (
                  <div key={item.id}>
                    <div>{item.volumeInfo.title}</div>
                    <div>{item.id}</div>
                    <button onClick={() => removeFromCartHandler(item.id)}>
                      REMOVE
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </MainBody>
  );
});

export default Cart;
