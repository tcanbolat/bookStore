import React, { useState, useEffect, useRef } from "react";

import classes from "./cart.module.css";
import API from "../../utils/API";
import PlaceHolder from "../../components/UI/PlaceHolder/placeHolder";
import Spinner from "../../components/UI/Spinner/Spinner";
import Orders from "../../components/Orders/Orders";
import Aux from "../../hoc/Auxillary/Auxillary";
import MainBody from "../../components/MainBody/MainBody";
import CartItems from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import OrderHistory from "../OrderHistory/OrderHistory";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  // loading state that displays a Spinner component when true.
  // this is what displays when the page first loads, until data is recieved.
  const [loading, setLoading] = useState(true);
  // remove state that sets the Discard button to false when an delete post is sent
  // this prevents multiple delete requests of the same kind if the user repeadidly clicks delete.
  const [remove, setRemoving] = useState(false);
  // creating a current reference to the item count value;
  // the reference is being set in the itemCounterHandler();
  const countRef = useRef(null);
  // seting a state to the item count value;
  const [itemCount, setItemCount] = useState();
  const [itemId, setItemId] = useState(null);

  // an effect that will fetch saved items from the cart database.
  useEffect(() => {
    API.getCart()
      .then((res) => {
        // setting the loading state to false to remove spinner
        setLoading(false);
        console.log("REPSONSE: ", res.data);
        setCartItems(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  // another effect that uses a setTimeout(); to control the frequency of API calls.
  useEffect(() => {
    // timeout is set to 500 miliseconds.
    setTimeout(() => {
      // console.log(countRef);
      // console.log(itemCount);
      // ItemCount is the count state 500 miliseconds ago and the countRef.current is the current count value.
      if (itemCount === countRef.current) {
        // only when the previous state and current value are the same then the API call is sent.
        // this reduces the number of times a post request is made to the server by checking if the input value has stopped changing.
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
    // this effect triggers whenever itemCOunt and itemID state changes.
  }, [itemCount, itemId]);

  const removeFromCartHandler = (e, id) => {
    e.preventDefault();
    // disabling the Discard button.
    setRemoving(true);
    e.target.innerHTML = "&#8226;	&#8226;	&#8226;	&#8226;";
    // delete request sending the clicked items id.
    API.deleteBook(id)
      .then((res) => {
        // on success, removing the deleteed item from the list.
        const updateResults = cartItems.filter((item) => item.id !== id);
        setCartItems(updateResults);
        // setting the discard button back to normal.
        setRemoving(false);
      })
      .catch((err) => {
        console.log(err);
        setRemoving(false);
      });
  };

  // this controls the input as well as the up and down buttons values.
  // the values are coming from the CartItems component.
  // option comes from the buttons to add or subtract.
  // id comes from the buttons and input
  // e comes only from the input to capture the value.
  const itemCounterHandler = (option, id, e) => {
    // using the id sent, it finds the clicked item.
    const cartIndex = cartItems.findIndex((b) => {
      return b.id === id;
    });
    const item = {
      ...cartItems[cartIndex],
    };

    switch (option) {
      case "add":
        // if the option comes as add; add 1.
        item.count = parseInt(item.count) + 1;
        // returing the smae number if item count is over 550.
        if (item.count > 550) {
          return item;
        }
        // setting CountRef to this value.
        countRef.current = item.count;
        // setting the count state to this value.
        setItemCount(item.count);
        // seting the itemID state to this item.
        setItemId(id);
        break;
      case "subtract":
        // if the option comes as subtract; subtract 1.
        item.count = parseInt(item.count) - 1;
        // stopping the item count from set to less than 1.
        if (item.count < 1) {
          return item;
        }
        countRef.current = item.count;
        setItemCount(item.count);
        setItemId(id);
        break;
      default:
        // the default is connected to the input, because the input doesn't send back an option.
        e.preventDefault();
        // making sure the count value being set is between 1 -550.
        if (e.target.value >= 1 && e.target.value <= 550) {
          item.count = e.target.value;
          countRef.current = item.count;
          setItemCount(item.count);
          setItemId(id);
        }
    }
    // updating the state of the items value.
    const updatedCartItems = [...cartItems];
    updatedCartItems[cartIndex] = item;
    setCartItems(updatedCartItems);
  };

  const checkoutHandler = (subTotal) => {
    // filtering the cartItems state and bring back only the ones that are marked as inCart.
    const inCart = cartItems.filter((item) => item.inCart === true);
    const inCartIds = inCart.map((item) => item.id);
    // redirecting the subTotal and item id's that are marked as inCart to the checkout page.
    props.history.push({
      pathname: "/checkout",
      state: {
        total: subTotal,
        itemIds: inCartIds,
      },
    });
  };

  // if no items are saved to the cart database then this place holder will render;
  const emptyCart = (
    <PlaceHolder message="Your cart is empty">
      <Link to="./">Go Home.</Link>
      <Link to="orderhistory">Go to order history</Link>
    </PlaceHolder>
  );

  return (
    <MainBody>
      {loading ? (
        <Spinner />
      ) : cartItems.length <= 0 ? (
        emptyCart
      ) : (
        <div className={classes.Cart}>
          <Orders cart={cartItems} checkout={checkoutHandler} />
          <div className={classes.CartItemBody}>
            <Aux>
              <p className={classes.cartTotal}>{cartItems.length} items in cart</p>
              {/* <span onClick={() => props.history.push(`/orderhistory`)}>
                ORDER HISTORY
              </span> */}
              <CartItems
                remove={(e, bookId) => removeFromCartHandler(e, bookId)}
                count={(option, bookId, e) =>
                  itemCounterHandler(option, bookId, e)
                }
                cart={cartItems}
                removing={remove}
              />
            </Aux>
          </div>
        </div>
      )}
    </MainBody>
  );
};

export default Cart;
