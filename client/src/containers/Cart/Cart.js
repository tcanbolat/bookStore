import React, { useState, useEffect, useRef } from "react";

import classes from "./cart.module.css";
import API from "../../utils/API";
import PlaceHolder from "../../components/UI/PlaceHolder/placeHolder";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import Orders from "../../components/Orders/Orders";
import Aux from "../../hoc/Auxillary/Auxillary";

const Cart = React.memo(() => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const countRef = useRef();

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

  const itemCounterHandler = (option, id) => {
    switch (option) {
      case "add":
        const cartIndexToAdd = cartItems.findIndex((b) => {
          return b.id === id;
        });
        const itemToAdd = {
          ...cartItems[cartIndexToAdd],
        };
        if (!itemToAdd.count) {
          itemToAdd.count = 1;
        }
        itemToAdd.count = parseInt(itemToAdd.count) + 1;
        if (itemToAdd.count > 150) {
          return itemToAdd;
        }
        countRef.current = itemToAdd.count;
        setTimeout(() => {
          if (itemToAdd.count === countRef.current) {
          console.log(countRef);
            API.updateItemCount({
              id: id,
              count: itemToAdd.count,
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }, 1100);
        const addedUpdate = [...cartItems];
        addedUpdate[cartIndexToAdd] = itemToAdd;
        setCartItems(addedUpdate);
        break;
      case "subtract":
        const cartIndexToSubtract = cartItems.findIndex((b) => {
          return b.id === id;
        });
        const itemToSub = {
          ...cartItems[cartIndexToSubtract],
        };

        itemToSub.count = parseInt(itemToSub.count) - 1;
        if (!itemToSub.count) {
          itemToSub.count = 1;
        }
        countRef.current = itemToSub;
        setTimeout(() => {
          console.log(countRef.current.count);
          console.log(itemToSub.count);
          if (itemToSub.count === countRef.current.count) {
            API.updateItemCount({
              id: id,
              count: itemToSub.count,
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }, 1100);
        const subUpdate = [...cartItems];
        subUpdate[cartIndexToSubtract] = itemToSub;
        setCartItems(subUpdate);
        break;
      default:
        return null;
    }
  };

  const updateItemCountHandler = (e, id) => {
    if (e.target.value >= 1 && e.target.value <= 150) {
      const cartIndex = cartItems.findIndex((b) => {
        return b.id === id;
      });
      const item = {
        ...cartItems[cartIndex],
      };
      item.count = e.target.value;
      countRef.current = e.target.value;
      const newresults = [...cartItems];
      newresults[cartIndex] = item;
      setCartItems(newresults);
      setTimeout(() => {
        if (item.count === countRef.current) {
        console.log(countRef);
          API.updateItemCount({
            id: id,
            count: item.count,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, 1100);
    }
  };

  return (
    <Aux>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.Cart}>
        <Orders cart={cartItems} />
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
                            width:
                              parseInt(book.count) > 100 ? "2.8em" : "2.1em",
                          }}
                          id="nm-inp"
                          className="input-wrap"
                          value={book.count ? book.count : 1}
                          onChange={(e) => updateItemCountHandler(e, book.id)}
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
          )}
        </div>
      )}
    </Aux>
  );
});

export default Cart;
