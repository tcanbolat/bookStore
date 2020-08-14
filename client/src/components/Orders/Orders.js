import React from "react";

import classess from "./orders.module.css";

const Orders = ({ cart }) => {
  const priceArray = [];
  
  cart.forEach((item) => {
    priceArray.push(item.saleInfo.listPrice.amount * item.count);
  });

  const subTotal = priceArray.reduce((a, b) => a + b, 0);
  console.log(priceArray);
  return (
    <div className={classess.Orders}>
      <h4>Order Totals</h4>
      {cart.map((item) => {
        return (
          <div>
            <p>{item.volumeInfo.title}</p>
            <p> <em>X</em> {item.count ? item.count : 1} = ${(item.saleInfo.listPrice.amount * (item.count ? item.count : 1)).toFixed(2)}</p>
            <hr className={classess.LineBreak}/>
          </div>  
        );
      })}
      <h4>sub total: ${subTotal.toFixed(2)}</h4>
    </div>
  );
};

export default Orders;
