import React, { useEffect } from "react";
import API from "../../utils/API";

const OrderHistory = (props) => {
  useEffect(() => {
    API.getOrders()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>ORDER HISTORY!!!!!</div>;
};

export default OrderHistory;
