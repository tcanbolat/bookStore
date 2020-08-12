import React, { useState, useEffect } from "react";

import classes from "./cart.module.css";
import API from "../../utils/API";
import PlaceHolder from "../../components/UI/PlaceHolder/placeHolder";
import MainBody from "../../components/MainBody/MainBody";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import Orders from "../../components/Orders/Orders";
import Aux from "../../hoc/Auxillary/Auxillary";

const Cart = React.memo(() => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(1);

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

  let nameWidth = 2.1 + "em";
  if (itemCount.length > 2) {
    nameWidth = itemCount.length + "em";
  }

  const onInputChange = (e) => {
    if (e.target.value >= 0 && e.target.value < 150) {
      e.preventDefault();
      console.log(e.target.value);
      setItemCount(e.target.value);
    }
    return null;
  };

  return (
    <Aux>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.Cart}>
          <Orders />
          {cartItems.length <= 0 ? (
            emptyCart
          ) : (
            <div className={classes.CartItem}>
              {cartItems.map((book) => (
                <Aux>
                  <div key={book.id}>
                    <img
                      style={{ width: "90px" }}
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt="book cover"
                    />
                    <span>
                      <h3>{book.volumeInfo.title}</h3>
                      <Button
                        clicked={() => removeFromCartHandler(book.id)}
                        btnType="Danger"
                      >
                        REMOVE FROM CART
                      </Button>
                      <p>${book.saleInfo.listPrice.amount}</p>
                      <div className={classes.ItemCounter}>
                        <div>&#8681;</div>
                        <input
                          type="number"
                          style={{ width: `${nameWidth}` }}
                          id="nm-inp"
                          className="input-wrap"
                          value={itemCount}
                          onChange={onInputChange}
                        />
                        <div>&#8679;</div>
                      </div>
                    </span>
                  </div>
                  <span className={classes.Divider}></span>
                </Aux>
              ))}
            </div>
          )}
        </div>
      )}
    </Aux>
  );
});

export default Cart;
