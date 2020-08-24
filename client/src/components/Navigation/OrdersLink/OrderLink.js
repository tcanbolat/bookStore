import React from "react";
import { Link } from "react-router-dom";

import classes from "./ordersLink.module.css";

const OrderLink = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "auto" }}>
          <Link to="/orderhistory" className={classes.OrdersLink}>
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderLink;
