import React, { useState, useEffect, useRef } from "react";

import classes from "./cart.module.css";
import API from "../../utils/API";
import PlaceHolder from "../../components/UI/PlaceHolder/placeHolder";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import Orders from "../../components/Orders/Orders";
import Aux from "../../hoc/Auxillary/Auxillary";
import MainBody from "../../components/MainBody/MainBody";

const Cart = React.memo(() => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState();
  const [itemId, setItemId] = useState(null);
  const countRef = useRef(null);

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

  useEffect(() => {
    setTimeout(() => {
      console.log(countRef);
      console.log(itemCount);
      if (itemCount === countRef.current) {
        API.updateItemCount({
          id: itemId,
          count: itemCount,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 500);
  }, [itemCount, itemId]);

  const removeFromCartHandler = (e, id) => {
    e.preventDefault();
    // setLoading(true);
    API.deleteBook(id)
      .then((res) => {
        const updateResults = cartItems.filter((item) => item.id !== id);
        setCartItems(updateResults);
        // setLoading(false);
        console.log(updateResults);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log("STATE: ", cartItems);

  const itemCounterHandler = (option, id, e) => {
    const cartIndex = cartItems.findIndex((b) => {
      return b.id === id;
    });
    const item = {
      ...cartItems[cartIndex],
    };

    switch (option) {
      case "add":
        item.count = parseInt(item.count) + 1;
        if (item.count > 550) {
          return item;
        }
        countRef.current = item.count;
        setItemCount(item.count);
        setItemId(id);
        break;
      case "subtract":
        item.count = parseInt(item.count) - 1;
        if (item.count < 1) {
          return item;
        }
        countRef.current = item.count;
        setItemCount(item.count);
        setItemId(id);
        break;
      default:
        if (e.target.value >= 1 && e.target.value <= 550) {
          item.count = e.target.value;
          countRef.current = item.count;
          setItemCount(item.count);
          setItemId(id);
        }
    }

    const updatedCartItems = [...cartItems];
    updatedCartItems[cartIndex] = item;
    setCartItems(updatedCartItems);
  };

  return (
    <MainBody>
      {loading ? (
        <Spinner />
      ) : cartItems.length <= 0 ? (
        <div
          style={{ width: "80%", margin: "0 auto" }}
          className={classes.Cart}
        >
          {emptyCart}
        </div>
      ) : (
        <div className={classes.Cart}>
          <Orders cart={cartItems} />
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
                      clicked={(e) => removeFromCartHandler(e, book.id)}
                      btnType="Danger"
                    >
                      REMOVE FROM CART
                    </Button>
                    <p>${book.saleInfo.listPrice.amount}</p>
                    <div className={classes.ItemCounter}>
                      <div
                        onClick={() => {
                          itemCounterHandler("subtract", book.id);
                        }}
                      >
                        &#8681;
                      </div>
                      <input
                        type="number"
                        style={{
                          width: parseInt(book.count) > 100 ? "2.8em" : "2.1em",
                        }}
                        id="nm-inp"
                        className="input-wrap"
                        value={book.count ? book.count : 1}
                        onChange={(e) =>
                          itemCounterHandler("input", book.id, e)
                        }
                      />
                      <div
                        onClick={() => {
                          itemCounterHandler("add", book.id);
                        }}
                      >
                        &#8679;
                      </div>
                    </div>
                  </span>
                </div>
                <span className={classes.Divider}></span>
              </Aux>
            ))}
          </div>
        </div>
      )}
    </MainBody>
  );
});

export default Cart;
