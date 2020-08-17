import React from "react";

import classes from "./orders.module.css";
import Button from "../UI/Button/Button";

import Aux from "../../hoc/Auxillary/Auxillary";

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
      <h1 className={classes.TotalHeader}>sub total: ${subTotal}</h1>
      <hr/>
      <div className={classes.ItemList}>
        {cart.map((item) => {
          return (
            <div key={item.id} className={classes.OrderName}>
              <p>
                {item.volumeInfo.title} <em> X </em> {item.count}
              </p>
            </div>
          );
        })}
      </div>
      <hr/>
      <div className={classes.CheckoutBtn}>
        <Button btnType="Order">
          <span className={classes.TotalBtn}>${subTotal} </span>CHECK OUT
        </Button>
      </div>
    </div>
  );
};

export default Orders;
