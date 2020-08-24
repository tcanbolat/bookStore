const axios = require("axios");

module.exports = {
  getByOrderId: (req, res) => {
    const id = req.query.orderId;
    axios
      .get(
        `https://bookstore-709eb.firebaseio.com/cart.json?orderBy="orderID"&equalTo="` +
          id +
          `"`
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.err;
      });
  },
};
