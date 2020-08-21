import React, { useEffect, useState } from "react";

import API from "../../utils/API";
import classes from "./orderHistory.module.css";
import MainBody from "../../components/MainBody/MainBody";
import Spinner from "../../components/UI/Spinner/Spinner";
import ShipmentTracker from "../../components/ShipmentTracker/shipmentTracker";

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

  const orderList = orders.map((order) => {
    return (
      <div key={order.id} className={classes.OrderHistoryBody}>
        <div>
          <em>To:</em> {order.shipping.name}
          {/* {order.shipping.email}<br /> */}
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
            <em>Paid:</em> ${order.total}
          </div>
        </div>
        <div className={classes.OrderShipment}>
          <em>Shipping option:</em> {order.shipping.deliveryMethod}
          <div>
            <ShipmentTracker
              orderTime={order.orderTime}
              method={order.shipping.deliveryMethod}
            />
          </div>
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
