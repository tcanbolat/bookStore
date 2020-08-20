const axios = require("axios");

module.exports = {
  getOrderHistory: (req, res) => {
    console.log(req);
    axios
      .get(
        `https://bookstore-709eb.firebaseio.com/cart.json?orderBy="ordered"&equalTo="true"`
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
