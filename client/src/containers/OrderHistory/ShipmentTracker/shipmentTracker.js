import React, { useState, useEffect } from "react";

import classes from "./shipmentTracker.module.css";
import Button from "../../../components/UI/Button/Button";
import { ReactComponent as OrderLogo } from "../../../assets/images/order-svgrepo-com.svg";
import { ReactComponent as ShippedLogo } from "../../../assets/images/shipped-truck-svgrepo-com.svg";
import { ReactComponent as DeliveredLogo } from "../../../assets/images/delivered-box-svgrepo-com.svg";
import { ReactComponent as CheckMarkLogo } from "../../../assets/images/check-svgrepo-com.svg";

const ShipmentTracker = (props) => {
  const [shippingMethod, setShippingMethod] = useState(0.1);
  const [orderStatus, setOrderStatus] = useState("order is being prepared.");

  const orderTime = props.orderTime;
  const currentTime = new Date().getTime();
  const readyToShip = orderTime + 86400000;
  const priorityMail = orderTime + 172800000;
  const regularMail = orderTime + 259200000;

  const shippedEstimate = readyToShip - currentTime;
  const regularDeliveryEstimate = regularMail - currentTime;
  const priorityMailEstimate = priorityMail - currentTime;

  useEffect(() => {
    if (currentTime > readyToShip) {
      setOrderStatus("Order has been Shipped!");
    }
    switch (props.method) {
      case "cheapest":
        if (currentTime > regularMail) {
          setOrderStatus("Order has been delivered!");
          setShippingMethod(1);
        }

        break;
      case "fastest":
        if (currentTime > priorityMail) {
          setOrderStatus("Order has been delivered!");
          setShippingMethod(1);
        }
        break;
      default:
        return null;
    }
  }, [
    props.orderTime,
    props.method,
    currentTime,
    priorityMail,
    regularMail,
    readyToShip,
  ]);

  function msToHours(duration) {
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    return hours + " ";
  }

  return (
    <div className={classes.TrackingBody}>
      <div className={classes.TrackingBlock}>
        <svg>
          <OrderLogo opacity={currentTime > orderTime ? 1 : 0.1} />
          {currentTime > readyToShip ? (
            <CheckMarkLogo fill="green" opacity="0.5" />
          ) : null}
        </svg>
      </div>
      <div className={classes.TrackingBlock}>
        <svg>
          <ShippedLogo opacity={currentTime > readyToShip ? 1 : 0.1} />
          {shippingMethod === 1 ? (
            <CheckMarkLogo fill="green" opacity="0.5" />
          ) : null}
        </svg>
      </div>
      <div className={classes.TrackingBlock}>
        <svg>
          <DeliveredLogo opacity={shippingMethod} />
        </svg>
      </div>
      <div className={classes.OrderStatus}>
        <h3>{orderStatus}</h3>
        <div className={classes.Tdds}>
          {currentTime < readyToShip ? (
            msToHours(shippedEstimate) + " hours until ready to ship"
          ) : props.method === "fastest" && currentTime < priorityMail ? (
            msToHours(priorityMailEstimate) + "hours unitl delivery"
          ) : props.method === "cheapest" && currentTime < regularMail ? (
            msToHours(regularDeliveryEstimate) + "hours until delivery"
          ) : (
            <Button clicked={() => props.remove(props.id)} btnType="Close">
              Delete Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipmentTracker;
