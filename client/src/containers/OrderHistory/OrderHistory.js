import React, { useEffect, useState } from "react";

import API from "../../utils/API";
import classes from "./orderHistory.module.css";
import MainBody from "../../components/MainBody/MainBody";
import Spinner from "../../components/UI/Spinner/Spinner";
import ShipmentTracker from "./ShipmentTracker/shipmentTracker";

const OrderHistory = (props) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.getOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeOrderHandler = (id) => {
    API.deleteOrder(id)
      .then((res) => {
        console.log(res);
        const deleteOrder = orders.filter((order) => order.orderId !== id);
        setOrders(deleteOrder);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(id);
  };

  const orderList = orders.map((order) => {
    return (
      <div key={order.id} className={classes.OrderHistoryBody}>
        <div>
          <em>To:</em> {order.shipping.name}
          <div className={classes.AddressTitle}>
            <em>Address:</em>
          </div>
          <div className={classes.Address}>
            <em>Street:</em> {order.shipping.street} <br />
            <em>Zip:</em> {order.shipping.zipCode}
            <br />
            <em>Country:</em> {order.shipping.country}
            <br />
          </div>
          <div className={classes.OrderHistoryTotal}>
            <em>Paid:</em> $<strong>{order.total}</strong>
          </div>
        </div>
        <div className={classes.OrderShipment}>
          <div className={classes.Method}>
            <em>Shipping option:</em>
            <div>{order.shipping.deliveryMethod}</div>
            <span className={classes.OrderDetails}>order details...</span>
          </div>
          <ShipmentTracker
            id={order.orderId}
            orderTime={order.orderTime}
            method={order.shipping.deliveryMethod}
            remove={removeOrderHandler}
          />
        </div>
      </div>
    );
  });

  console.log(orders);

  return (
    <MainBody>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className={classes.OrderHistory}>Order History</div>
          {orderList}
        </div>
      )}
    </MainBody>
  );
};

export default OrderHistory;
