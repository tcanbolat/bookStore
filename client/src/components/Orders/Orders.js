import React from "react";

import classes from "./orders.module.css";
import Button from "../UI/Button/Button";

const Orders = ({ cart }) => {
  const priceArray = [];
  console.log(cart);
  cart.forEach((item) => {
    priceArray.push(item.saleInfo.listPrice.amount * item.count);
  });

  const subTotal = priceArray.reduce((a, b) => a + b, 0).toFixed(2);
  console.log(priceArray);
  return (
    <div className={classes.Orders}>
      <h1>sub total: ${subTotal}</h1>
      {cart.map((item) => {
        return (
          <div className={classes.OrderName}>
            <p>{item.volumeInfo.title} <em> X </em> {item.count}</p>
          </div>
        );
      })}
      <Button btnType="CartBtn">CHECK OUT</Button>
    </div>
  );
};

export default Orders;
