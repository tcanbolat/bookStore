import React, { useEffect, useState } from "react";

import API from "../../utils/API";
import classes from "./orderHistory.module.css";
import MainBody from "../../components/MainBody/MainBody";
import Spinner from "../../components/UI/Spinner/Spinner";
import ShipmentTracker from "./ShipmentTracker/shipmentTracker";
import PlaceHolder from "../../components/UI/PlaceHolder/placeHolder";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import instance from "../../utils/axios-instance";

const OrderHistory = (props) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  // effect that will get all orders from the REST API databse.
  useEffect(() => {
    API.getOrders()
      .then((res) => {
        // setting the orders state to the response from the database.
        setOrders(res.data);
        // set loading to false to stop spinner.
        setLoading(false);
      })
      .catch((err) => {
        // this component is wrapped around an errorHandler hoc that handles the errors.
        // set loading to false to stop spinner.
        setLoading(false);
      });
  }, []);

  const removeOrderHandler = (id) => {
    // set deleting to true to disable the button.
    setDeleting(true);
    API.deleteOrder(id)
      .then((res) => {
        // on suceess filter out the order that mathced with the orderId.
        const deleteOrder = orders.filter((order) => order.orderId !== id);
        // set the state to the filtered array.
        setOrders(deleteOrder);
        setDeleting(false);
      })
      .catch((err) => {
        setDeleting(false);
      });
  };

  const orderDetailsHandler = (orderId) => {
    // finding the order that was clicked return it from the orders state.
    const orderIndex = orders.findIndex((order) => {
      return order.orderId === orderId;
    });
    // defining the order
    const order = {
      ...orders[orderIndex],
    };
    // setting the clicked order to loading is true.
    order.loading = true;
    // making a copy of the state and updating it with the clicked object set to loading.
    const setloading = [...orders];
    setloading[orderIndex] = order;
    setOrders(setloading);

    // this basically toggles back to show the shipment tracker.
    // if the clicked object has show details set to true...
    if (order.showDetails) {
      // then set it to false as well as loading to false
      order.showDetails = false;
      order.loading = false;
      // updating the state.
      const toggleTracker = [...orders];
      toggleTracker[orderIndex] = order;
      setOrders(toggleTracker);
    } else {
      API.getByOrderId(orderId)
        .then((res) => {
          // on success, set all orders showdetals keys to false.
          // this is so that if a previous item is already showing order details; that will switch back to the tracker.
          // this can be removed if you want to show more than one order details at a time and manually toggle between each order.
          orders.map((a) => (a.showDetails = false));
          // set the showDeteails to the clicked items to true and loading to false.
          order["showDetails"] = true;
          order.loading = false;
          // copying and updating the orders state.
          const toggleDetail = [...orders];
          toggleDetail[orderIndex] = order;
          setOrders(toggleDetail);
          setOrderDetails(res.data);
        })
        .catch((err) => {
          // this container is wrapped around an errorHandler that handles all errors.
        });
    }
  };

  const details = orderDetails.map((orderItem) => {
    return (
      <div className={classes.OrderItems}>
        <div className={classes.ItemTitle}>{orderItem.volumeInfo.title}</div>
        <div className={classes.ItemPrice}>
          ${orderItem.saleInfo.listPrice.amount} <em>X</em> {orderItem.count}
        </div>
      </div>
    );
  });

  const orderList = orders.map((order) => {
    return (
      <div key={order.id} className={classes.OrderHistoryBody}>
        <div className={classes.shippingInfo}>
          <div>
            <em>To:</em> {order.shipping.name}
          </div>
          <div style={{ flexGrow: "0.5" }}>
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
          </div>
          <div className={classes.OrderHistoryTotal}>
            <em>Paid:</em> $<strong>{order.total}</strong>
          </div>
        </div>
        <div className={classes.OrderShipment}>
          <div className={classes.Method}>
            <em>Shipping option:</em>
            <div>{order.shipping.deliveryMethod}</div>
            <span
              onClick={() => orderDetailsHandler(order.orderId)}
              className={classes.OrderDetails}
            >
              {order.showDetails ? "Tracking..." : "order details..."}
            </span>
          </div>
          {order.loading === true ? (
            <Spinner />
          ) : order.showDetails ? (
            details
          ) : (
            <ShipmentTracker
              id={order.orderId}
              orderTime={order.orderTime}
              method={order.shipping.deliveryMethod}
              remove={removeOrderHandler}
              deleting={deleting}
            />
          )}
        </div>
      </div>
    );
  });

  return (
    <MainBody>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className={classes.OrderHistory}>Order History</div>
          {orders.length <= 0 ? (
            <PlaceHolder message="No active orders">
              <div>Add some books to the cart and place an order</div>
            </PlaceHolder>
          ) : (
            orderList
          )}
        </div>
      )}
    </MainBody>
  );
};

export default withErrorHandler(OrderHistory, instance);
